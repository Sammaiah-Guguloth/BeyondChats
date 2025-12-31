const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Scrapes the 5 oldest articles with structural hierarchy.
 * Optimized for BeyondChats (Elementor/WordPress) structure.
 */
const scrapeBeyondChats = async () => {
  const BASE_URL = "https://beyondchats.com/blogs/";

  try {
    const { data: initialHtml } = await axios.get(BASE_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    const $ = cheerio.load(initialHtml);

    // 1. Detect Pagination
    const pageLinks = $(".page-numbers")
      .map((i, el) => $(el).text())
      .get();
    const pageNumbers = pageLinks
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n));
    const lastPageNumber =
      pageNumbers.length > 0 ? Math.max(...pageNumbers) : 1;

    const articles = [];
    let currentPage = lastPageNumber;

    // 2. Loop through pages (starting from the last/oldest)
    while (articles.length < 5 && currentPage >= 1) {
      const pageUrl =
        currentPage === 1 ? BASE_URL : `${BASE_URL}page/${currentPage}/`;
      const { data: pageHtml } = await axios.get(pageUrl);
      const $page = cheerio.load(pageHtml);

      const postContainers = $page("article, .elementor-post, .post");
      const pageArticles = [];

      for (let i = 0; i < postContainers.length; i++) {
        const element = postContainers[i];
        const titleElement = $page(element)
          .find("h2, h3, .elementor-post__title")
          .find("a")
          .first();
        const title = titleElement.text().trim();
        const link = titleElement.attr("href");

        if (title && link) {
          try {
            const { data: articleHtml } = await axios.get(link);
            const $article = cheerio.load(articleHtml);
            const structuredContent = [];

            const selectors = [
              ".elementor-widget-theme-post-content",
              ".entry-content",
              ".elementor-widget-container",
              "article",
            ];

            let contentContainer = null;
            for (const selector of selectors) {
              if ($article(selector).length > 0) {
                // pick the one that has actual paragraph children
                if ($article(selector).find("p").length > 0) {
                  contentContainer = $article(selector);
                  break;
                }
              }
            }

            if (contentContainer) {
              // Extract headings, paragraphs, and list items in exact order
              contentContainer
                .find("h1, h2, h3, h4, h5, h6, p, li")
                .each((_, el) => {
                  const tag = el.name;
                  const text = $article(el).text().trim();

                  // Clean data: Ignore very short strings or navigation artifacts
                  if (text && text.length > 5) {
                    structuredContent.push({
                      type: tag.startsWith("h")
                        ? "heading"
                        : tag === "li"
                        ? "list-item"
                        : "paragraph",
                      tag: tag,
                      text: text,
                    });
                  }
                });
            }

            // If the array is still empty (container not found), grab all P tags
            if (structuredContent.length === 0) {
              $article("p").each((_, el) => {
                const text = $article(el).text().trim();
                if (text.length > 20) {
                  structuredContent.push({ type: "paragraph", tag: "p", text });
                }
              });
            }

            pageArticles.push({
              title,
              sourceUrl: link,
              originalContent: structuredContent,
              isAiUpdated: false,
            });

            console.log(
              `Scraped: ${title} (${structuredContent.length} blocks)`
            );
          } catch (err) {
            console.error(`Failed sub-page ${link}: ${err.message}`);
          }
        }
      }

      // Handle older-first logic
      if (currentPage === lastPageNumber) {
        articles.push(...pageArticles);
      } else {
        const needed = 5 - articles.length;
        articles.push(...pageArticles.slice(-needed));
      }
      currentPage--;
    }

    const finalSelection = articles.slice(0, 5);
    console.log(`Total Scraped for DB: ${finalSelection.length}`);
    return finalSelection;
  } catch (error) {
    console.error("Scraping Engine Failure:", error.message);
    throw new Error("Unable to fetch articles.");
  }
};

module.exports = scrapeBeyondChats;
