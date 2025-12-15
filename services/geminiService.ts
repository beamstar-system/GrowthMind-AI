import { GoogleGenAI, Type } from "@google/genai";
import { AuditResult, UserInput } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGrowthAudit = async (input: UserInput): Promise<AuditResult> => {
  const modelId = "gemini-2.5-flash"; // Efficient for structured data tasks

  const prompt = `
    Act as a senior business growth consultant. Analyze the following business profile and generate a comprehensive growth audit and strategy.
    
    Business Profile:
    - Industry: ${input.industry}
    - Company Size: ${input.companySize} employees
    - Monthly Revenue Range: ${input.revenueRange}
    - Primary Challenge: ${input.primaryChallenge}
    - Active Marketing Channels: ${input.marketingChannels.join(', ')}

    Your task is to:
    1. Calculate a hypothetical "Growth Health Score" (0-100) based on the challenge vs. resources implied.
    2. Identify key strengths and weaknesses relative to the industry.
    3. Provide 3 specific, actionable recommendations to overcome the primary challenge.
    4. Generate hypothetical data for a "Current vs Potential Revenue" projection chart over the next 4 quarters.
    5. Generate "Efficiency Metrics" scores (0-100) for 5 categories: "Acquisition", "Retention", "Tech Stack", "Team", "Brand" based on the industry norms vs the challenge.

    Be realistic but optimistic. The tone should be professional, insightful, and encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER, description: "Overall growth health score 0-100" },
            executiveSummary: { type: Type.STRING, description: "A 2-3 sentence high-level summary of the audit." },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 perceived strengths."
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 perceived weaknesses."
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                  effort: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
                },
                required: ["title", "description", "impact", "effort"]
              }
            },
            revenueProjection: {
              type: Type.ARRAY,
              description: "Data for 4 quarters showing current trajectory vs potential with AI implementation.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "e.g., 'Q1', 'Q2'" },
                  current: { type: Type.NUMBER },
                  potential: { type: Type.NUMBER }
                },
                required: ["name", "current", "potential"]
              }
            },
            efficiencyMetrics: {
              type: Type.ARRAY,
              description: "Scores for radar chart analysis.",
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  score: { type: Type.INTEGER }
                },
                required: ["category", "score"]
              }
            }
          },
          required: ["overallScore", "executiveSummary", "strengths", "weaknesses", "recommendations", "revenueProjection", "efficiencyMetrics"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }
    return JSON.parse(text) as AuditResult;

  } catch (error) {
    console.error("Error generating audit:", error);
    // Fallback mock data in case of critical failure to prevent app crash during demo
    return {
      overallScore: 72,
      executiveSummary: "While your foundation is strong, significant opportunities exist in optimizing your conversion funnel. Our analysis suggests your current tech stack may be underutilized.",
      strengths: ["Strong Market Fit", "Experienced Leadership", "Clear Value Prop"],
      weaknesses: ["Customer Acquisition Cost", "Automated Nurturing", "Data Silos"],
      recommendations: [
        { title: "Implement AI Lead Scoring", description: "Prioritize high-intent leads to reduce sales cycle time.", impact: "High", effort: "Medium" },
        { title: "Optimize Landing Page UX", description: "A/B test value propositions to improve conversion rates.", impact: "Medium", effort: "Low" },
        { title: "Automate Email Sequences", description: "Deploy behavioral trigger emails for improved retention.", impact: "High", effort: "Medium" }
      ],
      revenueProjection: [
        { name: "Q1", current: 50, potential: 65 },
        { name: "Q2", current: 55, potential: 80 },
        { name: "Q3", current: 58, potential: 110 },
        { name: "Q4", current: 60, potential: 145 }
      ],
      efficiencyMetrics: [
        { category: "Acquisition", score: 65 },
        { category: "Retention", score: 80 },
        { category: "Tech Stack", score: 45 },
        { category: "Team", score: 90 },
        { category: "Brand", score: 70 }
      ]
    };
  }
};
