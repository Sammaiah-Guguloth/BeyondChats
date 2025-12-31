require("dotenv").config();
const axios = require("axios");
const { getCompetitorLinks } = require("./services/search.service");
const { scrapeFullContent } = require("./services/scraper.service");
const { transformContent } = require("./services/ai.service");

// Use local base URL
const API_BASE_URL =
  (process.env.API_BASE_URL || "http://localhost:5000/api") + "/articles";

const runAutomation = async () => {
  try {
    console.log("STARTING PHASE 2: AI CONTENT ORCHESTRATION");

    // 1. Fetch articles from Phase 1 CRUD API [cite: 15]
    const { data } = await axios.get(API_BASE_URL);
    const articles = data.articles || [];

    if (articles.length === 0) {
      console.log("⚠️ No articles found. Ensure Phase 1 seeding is complete.");
      return;
    }

    for (const article of articles) {
      // Skip if already processed to save API credits
      if (article.isAiUpdated) {
        console.log(`Skipping "${article.title}" (Already Enhanced)`);
        continue;
      }

      console.log(`\n RESEARCHING: "${article.title}"`);

      // Step 2: Search for Top 2 Competitors on Google [cite: 17, 18]
      const competitorLinks = await getCompetitorLinks(article.title);

      // Step 3: Scrape Content from external links [cite: 19]
      const competitorData = [];
      const referenceLinks = [];

      for (const item of competitorLinks) {
        console.log(`Scraping Competitor: ${item.link}`);
        const content = await scrapeFullContent(item.link);

        referenceLinks.push(item.link);
        if (content) competitorData.push(content);
      }

      // Step 4: AI Transformation via Gemini
      console.log("Synthesizing AI-Optimized Version...");
      const aiGeneratedBody = await transformContent(
        article.originalContent,
        competitorData
      );

      if (aiGeneratedBody) {
        // Step 5: Format and Append Citations
        const finalContent = `
${aiGeneratedBody}

---
### References & Sources:
${referenceLinks.map((link) => `- [View Source](${link})`).join("\n")}
                `.trim();

        // Step 6: Publish PUT API [cite: 21]
        await axios.put(`${API_BASE_URL}/${article._id}`, {
          updatedContent: finalContent,
          references: referenceLinks,
          isAiUpdated: true,
        });

        console.log(
          `   ✅ SUCCESS: Article updated with ${referenceLinks.length} references.`
        );
      } else {
        console.log("FAILED: AI generation error.");
      }
    }

    console.log("\n PHASE 2 COMPLETE: All articles processed successfully.");
  } catch (error) {
    console.error("CRITICAL PROCESSOR ERROR:", error.message);
  }
};

runAutomation();
