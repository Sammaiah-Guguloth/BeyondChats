require("dotenv").config();
const axios = require("axios");
const { getCompetitorLinks } = require("./services/search.service");
const { scrapeFullContent } = require("./services/scraper.service");
const { transformContent } = require("./services/ai.service");

// Your API base URL (ensure your server is running)
const API_BASE_URL = process.env.API_BASE_URL + "/articles";

/**
 * Main automation worker for Phase 2.
 */
const runAutomation = async () => {
  try {
    console.log("Starting Phase 2: AI Content Enhancement...");

    // 1. Fetch articles from your Phase 1 API
    const { data: articles } = await axios.get(API_BASE_URL);

    if (!articles || articles.length === 0) {
      console.log("⚠️ No articles found in DB. Run Phase 1 seed first.");
      return;
    }

    // console.log("articles : ", articles.articles);
    for (const article of articles.articles) {
      console.log(`\n Processing: "${article.title}"`);

      // Step 2: Search for Top 2 Competitors
      const competitorLinks = await getCompetitorLinks(article.title);

      // Step 3: Scrape Content from those links
      const competitorData = [];
      const referenceLinks = [];

      for (const item of competitorLinks) {
        const content = await scrapeFullContent(item.link);
        referenceLinks.push(item.link); // Always include the link in references
        if (content) {
          competitorData.push(content);
        }
      }

      // Step 4: AI Transformation via Gemini
      console.log("   Calling Gemini AI for transformation...");
      const aiGeneratedBody = await transformContent(
        article.originalContent,
        competitorData
      );

      if (aiGeneratedBody) {
        console.log("    AI transformation successful.");
        // Step 5: Append Citations (Assignment Requirement)
        const finalContent = `
${aiGeneratedBody}

---
### References & Further Reading:
${referenceLinks.map((link) => `- ${link}`).join("\n")}
                `.trim();

        // Step 6: Publish via your PUT API
        await axios.put(`${API_BASE_URL}/${article._id}`, {
          updatedContent: finalContent,
          references: referenceLinks,
          isAiUpdated: true,
        });

        console.log(
          `   ✅ Successfully updated and cited ${referenceLinks.length} sources.`
        );
      } else {
        console.log("  AI transformation failed, skipping update.");
      }
    }

    console.log("\n Phase 2 Complete! All articles have been enhanced.");
  } catch (error) {
    console.error(" Critical Error in Processor:", error.message);
  }
};

// Execute the worker
runAutomation();
