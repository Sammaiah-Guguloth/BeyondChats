const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY);

/**
 * Service to find top 2 competitor blog links using SerpApi.
 */
const getCompetitorLinks = async (title) => {
  return new Promise((resolve, reject) => {
    const params = {
      q: `${title} -site:beyondchats.com`,
      engine: "google",
      hl: "en",
      gl: "us",
    };

    // console.log("came in function ");

    search.json(params, (data) => {
      if (data.error) {
        return reject(new Error(data.error));
      }

      const results = data.organic_results || [];

      // Filter to ensure we only get blogs/articles
      // We ignore common non-blog sites like LinkedIn, YouTube, Facebook, Amazon, Pinterest
      const filteredLinks = results
        .filter((res) => {
          const url = res.link.toLowerCase();
          const isExcluded =
            url.includes("linkedin.com") ||
            url.includes("youtube.com") ||
            url.includes("facebook.com") ||
            url.includes("amazon.com") ||
            url.includes("pinterest.com");
          return !isExcluded;
        })
        .slice(0, 2) // Take the top 2
        .map((res) => ({
          title: res.title,
          link: res.link,
        }));

      console.log(`\n SEARCH RESULTS FOR: "${title}"`);
      filteredLinks.forEach((item, i) => {
        console.log(`   Link ${i + 1}: ${item.link}`);
      });

      resolve(filteredLinks);
    });
  });
};

module.exports = { getCompetitorLinks };
