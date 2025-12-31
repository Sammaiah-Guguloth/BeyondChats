const articleModel = require("../models/article.model");
const scrapeBeyondChats = require("../utils/scraper");

exports.initializeDatabase = async (req, res) => {
  try {
    // 1. Validate if seeding is necessary
    const count = await articleModel.countDocuments();

    if (count >= 5) {
      return res.status(200).json({
        message: "Database already initialized with required articles.",
      });
    }

    // 2. Execute structured scraper
    const data = await scrapeBeyondChats();

    if (!data || data.length < 5) {
      return res.status(500).json({
        message: `Scraping failed: Expected 5 articles, found ${
          data?.length || 0
        }`,
      });
    }

    // 3. Store structured data in DB
    const savedArticles = [];
    for (let article of data) {
      // Use findOneAndUpdate with upsert for production-grade reliability
      const articleDoc = await articleModel.findOneAndUpdate(
        { sourceUrl: article.sourceUrl }, // Match criteria
        {
          title: article.title,
          sourceUrl: article.sourceUrl,
          originalContent: article.originalContent, // Now saving the array of objects
          isAiUpdated: false,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      savedArticles.push(articleDoc);
    }

    res.status(201).json({
      message:
        "Phase 1 Complete: 5 oldest articles stored with semantic structure.",
      count: savedArticles.length,
      articles: savedArticles,
    });
  } catch (err) {
    console.error("Critical Error during DB initialization: ", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    // Sort by oldest first as per assignment requirement for Phase 1
    const articles = await articleModel.find().sort({ createdAt: 1 });
    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleModel.findById(id);

    if (!article) {
      return res
        .status(404)
        .json({ message: "Article system error: ID not found" });
    }

    res.status(200).json({ article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Using findByIdAndUpdate ensures we only update fields sent by the AI script in Phase 2
    const updatedArticle = await articleModel.findByIdAndUpdate(
      id,
      { $set: req.body }, // Dynamically updates fields like updatedContent and references
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res
        .status(404)
        .json({ message: "Update failed: Article ID missing" });
    }

    res.status(200).json({
      message: "Article successfully synchronized with AI enhancements",
      article: updatedArticle,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
