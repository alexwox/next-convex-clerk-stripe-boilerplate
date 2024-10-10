"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import Stripe from "stripe";
import { internal } from "./_generated/api";

type Metadata = {
    userId: string;
    stripeId: string;
    amount: number;
    currency: string;
}

export const pay = action({
    // The action takes the message the user composed
    args: {},
    handler: async (ctx, args) => {
      // We need to tell Stripe where to redirect to
      const user = await ctx.auth.getUserIdentity()
      
      console.log(user);
      console.log(user?.emailVerified);

      if (!user) {
        throw new Error("User not logged in to pay");
      }

      if (!user.emailVerified) {
        throw new Error("Please verify your email to pay");
      }

      const domain = process.env.HOSTING_URL ?? "http://localhost:3000";
      const stripe = new Stripe(process.env.STRIPE_KEY!, {
        apiVersion: "2024-09-30.acacia",
      });

      const session = await stripe.checkout.sessions.create({
        line_items: [{price: process.env.STRIPE_PRICE_ID!, quantity: 1}],
        customer_email: user.email,
        metadata: {
            userId: user.subject,
        },
        mode: "payment",
        success_url: `${domain}`,
        cancel_url: `${domain}`,
        automatic_tax: { enabled: true },
      });
  
      return session.url!;
    },
  });

export const fulfill = internalAction({
    args: {
        signature: v.string(),
        payload: v.string(),
    },
    handler: async (ctx, args) => {
        const stripe = new Stripe(process.env.STRIPE_KEY!, {
            apiVersion: "2024-09-30.acacia",
        });

        const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET as string;
        try {
            const event = stripe.webhooks.constructEvent(
                args.payload,
                args.signature,
                webhookSecret
            );

            if (event.type === "checkout.session.completed") {
                const completedEvent = event.data.object as Stripe.Checkout.Session & {
                    metadata: Metadata;
                };
                const userId = completedEvent.metadata.userId;

                await ctx.runMutation(internal.users.setStripeId, {
                    userId: userId,
                    stripeId: completedEvent.id,
                })
                await ctx.runMutation(internal.users.upgradeUser, {
                    userId: userId,
                })

                await ctx.runMutation(internal.payments.fulfill, {
                    userId: userId,
                })
            }

            return {
                type: "success",
                message: "Webhook received",
            }
        } catch (error) {
            console.error(error);
            return {
                type: "error",
                message: "Webhook failed",
            }
        }
    }
})