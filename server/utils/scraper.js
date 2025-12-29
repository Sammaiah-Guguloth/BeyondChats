const axios = require("axios");
const cheerio = require("cheerio");

const scrapeBeyondChats = async () => {
  const BASE_URL = "https://beyondchats.com/blogs/";

  try {
    const { data: initialHtml } = await axios.get(BASE_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const $ = cheerio.load(initialHtml);

    // Finding pagination to identify the last page
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
            // STEP 1: Fetch the specific article page
            const { data: articleHtml } = await axios.get(link);
            const $article = cheerio.load(articleHtml);

            /** * STEP 2: Extract Full Content based on your provided HTML snippet.
             * We target the theme-post-content widget inside the #content container.
             */
            let fullContent = $article(
              "#content .elementor-widget-theme-post-content"
            )
              .text()
              .trim();

            // Fallback if the above ID/Class structure varies slightly
            if (!fullContent) {
              fullContent = $article(".elementor-widget-theme-post-content")
                .first()
                .text()
                .trim();
            }

            pageArticles.push({
              title,
              source_url: link,
              content: fullContent || "Content extraction failed",
              is_ai_updated: false,
            });
          } catch (err) {
            console.error(`Error fetching article at ${link}: ${err.message}`);
          }
        }
      }

      // Logic to collect 5 oldest articles starting from the last page [cite: 9]
      if (currentPage === lastPageNumber) {
        articles.push(...pageArticles);
      } else {
        const needed = 5 - articles.length;
        articles.push(...pageArticles.slice(-needed));
      }
      currentPage--;
    }

    return articles.slice(0, 5); // Return exactly the 5 oldest [cite: 9]
  } catch (error) {
    throw new Error("Scraping engine failure: " + error.message);
  }
};

module.exports = scrapeBeyondChats;
