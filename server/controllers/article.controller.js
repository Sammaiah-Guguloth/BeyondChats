const articleModel = require("../models/article.model");
const scrapeBeyondChats = require("../utils/scraper");

exports.initializeDatabase = async (req, res) => {
  try {
    // 1. Validating if seeding is necessary
    const count = await articleModel.countDocuments();

    if (count >= 5) {
      return res.status(200).json({
        message: "Database already initialized with required articles.",
      });
    }

    // 2. Executing structured scraper
    const data = await scrapeBeyondChats();

    if (!data || data.length < 5) {
      return res.status(500).json({
        message: `Scraping failed: Expected 5 articles, found ${
          data?.length || 0
        }`,
      });
    }

    // 3. Storing structured data in DB
    const savedArticles = [];
    for (let article of data) {
      const articleDoc = await articleModel.findOneAndUpdate(
        { sourceUrl: article.sourceUrl },
        {
          title: article.title,
          sourceUrl: article.sourceUrl,
          originalContent: article.originalContent,
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
    // Sort by oldest first
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
    const updatedArticle = await articleModel.findByIdAndUpdate(
      id,
      { $set: req.body },
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
