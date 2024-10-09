import { internalMutation } from "./_generated/server";
import { v } from "convex/values";


export const createUser = internalMutation({
    args: {
        userId: v.string(),
        email: v.string(),
        isPremium: v.boolean(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            id: args.userId,
            email: args.email,
            isPremium: args.isPremium,
        })
    }
})