import { action } from "./_generated/server";
import { v } from "convex/values";
export const analyze = action({
    args: { competitors: v.array(v.string()), industry: v.optional(v.string()) },
    handler: async (_ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o", messages: [
                    {
                        role: "system", content: `You are CompetitorSpy, a competitive intelligence analyst. Analyze competitors and provide actionable insights. Output JSON:
{"overview":"<market overview>","comparison":[{"name":"<competitor>","strengths":[""],"weaknesses":[""],"uniqueValue":"","threatLevel":"high|medium|low"}],"opportunities":[""],"recommendations":[""]}` },
                    { role: "user", content: `Competitors: ${args.competitors.join(', ')}${args.industry ? `\nIndustry: ${args.industry}` : ''}` },
                ], temperature: 0.5, max_tokens: 3000, response_format: { type: "json_object" }
            }),
        });
        if (!r.ok) throw new Error(`API error`);
        return JSON.parse((await r.json() as any).choices?.[0]?.message?.content ?? "{}");
    },
});
