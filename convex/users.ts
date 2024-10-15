import { internalMutation, query, QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const getUser = query({
    args: {},
    handler: async (ctx, args) => {

        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            return undefined;
        }

        return ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", user.subject))
            .first();
    }
})

export const isUserPremium = async (ctx: QueryCtx | MutationCtx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
        return false;
    }

    const userToCheck = await ctx.db
    .query("users")
    .withIndex("by_userId", (q) => q.eq("userId", user.subject))
    .first();

    return userToCheck?.isPremium || false;
}

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

        await ctx.db.patch(user._id, {
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