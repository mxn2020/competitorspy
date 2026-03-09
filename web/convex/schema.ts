import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
export default defineSchema({
  ...authTables,
  analyses: defineTable({
    competitors: v.array(v.string()), industry: v.optional(v.string()),
    overview: v.string(),
    comparison: v.array(v.object({ name: v.string(), strengths: v.array(v.string()), weaknesses: v.array(v.string()), uniqueValue: v.string(), threatLevel: v.string() })),
    opportunities: v.array(v.string()), recommendations: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
