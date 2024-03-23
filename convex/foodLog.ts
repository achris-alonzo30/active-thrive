import { v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";

export const logFood = mutation({
  args: {
    text: v.string(),
    brand: v.string(),
    userId: v.string(),
    calories: v.string(),
    mealTime: v.string(),
    servingSize: v.optional(v.string()),
  },
  handler: async (ctx, { userId, text, brand, calories, servingSize, mealTime}) => {
    return ctx.db.insert("foodLog", {
      text,
      brand,
      userId,
      calories,
      mealTime,
      servingSize,
    });
  },
});


export const fetchLogs = query({
  args: { userId: v.string() },
  handler: async ( ctx, { userId } ) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    return await ctx.db.query("foodLog").withIndex("byUser", (q) => q.eq("userId", userId)).filter((q) => q.and(
      q.gte(q.field("_creationTime"), startOfToday.getTime()),
      q.lte(q.field("_creationTime"), endOfToday.getTime())
    )).collect();
  }
})
