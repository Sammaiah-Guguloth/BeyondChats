const articleModel = require("../models/article.model");
const scrapeBeyondChats = require("../utils/scraper");

exports.initializeDatabase = async (req, res) => {
  try {
    // validating
    const count = await articleModel.countDocuments();

    if (count >= 5) {
      return res
        .status(200)
        .json({ message: "Database already has articles." });
    }

    // scrape the articles
    const data = await scrapeBeyondChats();

    if (data.length < 5) {
      return res.status(500).json({
        message: "Less than 5 articles scraped, not stored",
      });
    }

    // Store in the db
    for (let article of data) {
      const existingArticle = await articleModel.findOne({
        sourceUrl: article.source_url,
      });

      if (!existingArticle) {
        const savedArticle = new articleModel({
          title: article.title,
          sourceUrl: article.source_url,
          originalContent: article.content,
        });

        await savedArticle.save();
      }
    }

    res.status(201).json({
      articles: data,
      message: "5 oldest articles stored.",
    });
  } catch (err) {
    console.log("Error while initializing the DB: ", err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAllArticles = async (req, res) => {
  console.log("came from react ");
  try {
    const articles = await articleModel.find();
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
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      sourceUrl,
      originalContent,
      updatedContent,
      references,
      isAiUpdated,
    } = req.body;
    const updatedArticle = await articleModel.findByIdAndUpdate(
      id,
      {
        title,
        sourceUrl,
        originalContent,
        updatedContent,
        references,
        isAiUpdated,
      },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ article: updatedArticle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
