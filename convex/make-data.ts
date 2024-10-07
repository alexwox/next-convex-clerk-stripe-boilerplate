import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const makeData = mutation({
    args: {
        randString: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.insert("data", {
            randString: args.randString,
            userId: user.subject,
        });
    }
})

export const getData = mutation({
    args: {},

    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.
            query("data"
            ).filter((q) => q.eq(q.field("userId"), user.subject)
            ).collect();
        
    }
})