import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  placeholder_data: defineTable({
    title: v.string(),
    userId: v.string(),
  }),
  users: defineTable({
    id: v.string(),
    email: v.string(),
    isPremium: v.boolean(),
  })
});