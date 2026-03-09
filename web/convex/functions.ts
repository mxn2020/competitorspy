import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const saveAnalysis = mutation({
  args: { competitors: v.array(v.string()), industry: v.optional(v.string()), overview: v.string(), comparison: v.array(v.object({ name: v.string(), strengths: v.array(v.string()), weaknesses: v.array(v.string()), uniqueValue: v.string(), threatLevel: v.string() })), opportunities: v.array(v.string()), recommendations: v.array(v.string()) },
  handler: async (ctx, args) => await ctx.db.insert("analyses", { ...args, createdAt: Date.now() }),
});
export const getRecent = query({ args: {}, handler: async (ctx) => await ctx.db.query("analyses").order("desc").take(20) });
export const getStatus = query({ args: {}, handler: async () => ({ status: "Online", timestamp: Date.now() }) });
