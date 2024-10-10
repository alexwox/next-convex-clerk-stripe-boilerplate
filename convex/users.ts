import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";

export const createUser = internalMutation({
    args: {
        userId: v.string(),
        email: v.string(),
        isPremium: v.boolean(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            userId: args.userId,
            email: args.email,
            isPremium: args.isPremium,
            stripeId: undefined,
        })
    }
})

export const upgradeUser = internalMutation({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("userId"), args.userId)).first();

        if (!user) {
            throw new ConvexError("User not found");
        }

        await ctx.db.patch(args.userId as Id<"users">, {
            isPremium: true,
        })
    }
})

export const setStripeId = internalMutation({
    args: {
        userId: v.string(),
        stripeId: v.string(),
    },
    handler: async (ctx, args) => {

        const user = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .first();

        if (!user) {
            throw new ConvexError("User not found");
        }

        await ctx.db.patch(user._id, {
            stripeId: args.stripeId,
        })
    }
})