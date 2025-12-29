const axios = require("axios");
const cheerio = require("cheerio");

const scrapeBeyondChats = async () => {
  const BASE_URL = "https://beyondchats.com/blogs/";

  try {
    console.log("Initializing scraper: Finding the last page...");

    const { data: initialHtml } = await axios.get(BASE_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const $ = cheerio.load(initialHtml);

    // Finding pagination
    const pageLinks = $(".page-numbers")
      .map((i, el) => $(el).text())
      .get();
    const pageNumbers = pageLinks
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n));
    const lastPageNumber =
      pageNumbers.length > 0 ? Math.max(...pageNumbers) : 1;

    console.log(`Detected Last Page: ${lastPageNumber}`);

    const articles = [];
    let currentPage = lastPageNumber;

    while (articles.length < 5 && currentPage >= 1) {
      const pageUrl =
        currentPage === 1 ? BASE_URL : `${BASE_URL}page/${currentPage}/`;
      const { data: pageHtml } = await axios.get(pageUrl);
      const $page = cheerio.load(pageHtml);

      // IMPROVED SELECTORS: Targeting broader post containers
      const postContainers = $page("article, .elementor-post, .post");

      console.log(
        `Debug: Found ${postContainers.length} potential post containers on page ${currentPage}.`
      );

      const pageArticles = [];
      postContainers.each((index, element) => {
        // Find title and link (usually in an h1-h4 or a class with 'title')
        const titleElement = $page(element)
          .find("h2, h3, .elementor-post__title")
          .find("a")
          .first();
        const title = titleElement.text().trim();
        const link = titleElement.attr("href");

        // Find excerpt/content
        const excerpt = $page(element)
          .find(".elementor-post__excerpt, .entry-content, p")
          .first()
          .text()
          .trim();

        if (title && link) {
          pageArticles.push({
            title,
            source_url: link,
            content: excerpt || "No excerpt available",
            is_ai_updated: false,
          });
        }
      });

      // For the last page, take all articles (oldest)
      // For previous pages, take from the end (oldest on that page)
      if (currentPage === lastPageNumber) {
        articles.push(...pageArticles);
      } else {
        const needed = 5 - articles.length;
        articles.push(...pageArticles.slice(-needed));
      }

      currentPage--;
    }

    // The assignment asks for the 5 oldest articles
    const oldestArticles = articles.slice(0, 5);

    console.log(`Successfully scraped ${oldestArticles.length} articles.`);

    oldestArticles.forEach((article, index) => {
      console.log(`Article ${index + 1}:`, {
        title: article.title,
        source_url: article.source_url,
        content: article.content,
      });
    });
    return oldestArticles;
  } catch (error) {
    console.error("Scraping failed:", error.message);
    throw new Error("Unable to fetch articles.");
  }
};

module.exports = scrapeBeyondChats;
