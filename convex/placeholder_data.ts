import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const makeData = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.insert("placeholder_data", {
            title: args.title,
            userId: user.subject,
        });
    }
})

export const getData = query({
    args: {},

    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            return [];
        }

        return await ctx.db.
            query("placeholder_data"
            ).filter((q) => q.eq(q.field("userId"), user.subject)
            ).collect();
        
    }
})

export const deleteData = mutation({
    args: {
        id: v.id("placeholder_data"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const existingData = await ctx.db.get(args.id);
        
        if (!existingData) {
            throw new ConvexError("Data not found");
        }

        if (existingData.userId !== user.subject) {
            throw new ConvexError("Unauthorized: You can only delete your own data");
        }

        await ctx.db.delete(args.id);
    }
})