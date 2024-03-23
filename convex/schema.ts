import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({


  foodLog: defineTable({
    text: v.string(),
    brand: v.string(),
    userId: v.string(),
    calories: v.string(),
    mealTime: v.string(),
    servingSize: v.optional(v.string()),
  }).index("byUser", ["userId"]),
});
