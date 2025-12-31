const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Universal Scraper for competitor articles.
 * Designed to extract the main body text from arbitrary URLs.
 */
const scrapeFullContent = async (url) => {
  try {
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    // 1. Remove "noise" elements that confuse AI
    $("script, style, nav, footer, header, aside, .comments, .ads").remove();

    // 2. Production Strategy: Targeted Extraction
    // Most blogs put content in <article> or specific classes
    let mainContent = $("article, .post-content, .entry-content, .main-content")
      .text()
      .trim();

    // 3. Fallback: If no common container is found, grab all paragraphs
    if (!mainContent || mainContent.length < 200) {
      mainContent = $("p")
        .map((i, el) => $(el).text())
        .get()
        .join("\n\n")
        .trim();
    }

    // 4. Clean up whitespace
    const cleanedContent = mainContent.replace(/\s+/g, " ").substring(0, 5000); // Limit to 5k chars

    console.log(`   Scraped ${cleanedContent.length} characters from: ${url}`);
    return cleanedContent;
  } catch (error) {
    console.error(`   ⚠️ Scraper Warning: Could not read ${url}. Skipping.`);
    return null;
  }
};

module.exports = { scrapeFullContent };
