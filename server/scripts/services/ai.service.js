const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * AI Service to transform content using Gemini.
 * It takes the original article and competitor data to create a superior version.
 */
const transformContent = async (originalContent, competitorData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
            You are an expert SEO Content Strategist. 
            
            GOAL: Rewrite the "Original Article" provided below to match or exceed the quality, 
            depth, and formatting of the "Top Ranking Competitors" content.
            
            INSTRUCTIONS:
            1. Use professional Markdown formatting (H1, H2, Bullet points).
            2. Improve the vocabulary and technical depth based on competitor insights.
            3. Ensure the core message of the original article remains intact.
            4. The output must be the full article text only.

            --- ORIGINAL ARTICLE ---
            ${originalContent}

            --- COMPETITOR CONTENT FOR REFERENCE ---
            ${competitorData.join("\n\n---\n\n")}
        `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.log(" AI Service Error:", error.message);
    return null;
  }
};

module.exports = { transformContent };
