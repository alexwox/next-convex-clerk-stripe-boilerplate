import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  placeholder_data: defineTable({
    title: v.string(),
    userId: v.string(),
  }),
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    isPremium: v.boolean(),
    stripeId: v.optional(v.string()),
  })
  .index("by_userId", ["userId"]),
  payments: defineTable({
    userId: v.string(),
    stripeId: v.string(),
    amount: v.number(),
    currency: v.string(),
    status: v.string(),
  })
  .index("by_userId", ["userId"]),
});