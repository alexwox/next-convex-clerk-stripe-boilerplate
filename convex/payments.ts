import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createPayment = internalMutation({
  args: { userId: v.string(), amount: v.number(), currency: v.string(), stripeId: v.string()},
  handler: async (ctx, args) => {
    return await ctx.db.insert("payments", {
        userId: args.userId,
        amount: args.amount,
        currency: args.currency,
        status: "pending",
        stripeId: args.stripeId,
        });
    },
});

export const markPending = internalMutation({
  args: {
    paymentId: v.id("payments"),
    stripeId: v.string(),
  },
  handler: async (ctx, { paymentId, stripeId }) => {
    await ctx.db.patch(paymentId, { stripeId });
  },
});

export const fulfill = internalMutation({
    args: { userId: v.string() },
    handler: async ({ db }, args) => {
      const { _id: paymentId } = (await db
        .query("payments")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .unique())!;
      await db.patch(paymentId, { status: "fulfilled" });
    },
  });