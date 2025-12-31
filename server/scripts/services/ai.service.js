const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * AI Service to transform content using Gemini.
 */
const transformContent = async (originalContent, competitorData) => {
  try {
    // Determine if content is structured array or plain string
    const flattenedOriginal = Array.isArray(originalContent)
      ? originalContent
          .map((block) => `${block.tag.toUpperCase()}: ${block.text}`)
          .join("\n")
      : originalContent;

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
            You are an expert SEO Content Strategist. 
            
            GOAL: Rewrite the "Original Article" provided below to match or exceed the quality, 
            depth, and formatting of the "Top Ranking Competitors".
            
            INSTRUCTIONS:
            1. Use high-end Markdown (H1, H2, Bold text, Lists).
            2. Improve the technical depth using insights from competitor articles.
            3. Ensure the tone is professional, engaging, and unique.
            4. Output ONLY the refined article content in Markdown format.

            --- ORIGINAL ARTICLE (RAW DATA) ---
            ${flattenedOriginal}

            --- COMPETITOR CONTEXT ---
            ${competitorData.join("\n\n---\n\n")}
        `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.log("❌ AI Service Error:", error.message);
    return null;
  }
};

module.exports = { transformContent };
