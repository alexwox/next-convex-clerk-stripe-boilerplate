"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import Stripe from "stripe";
import { internal } from "./_generated/api";

type Metadata = {
    userId: string;
}

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