const articleModel = require("../models/article.model");
const scrapeBeyondChats = require("../utils/scraper");

// initial scraping or seeding the db
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

// get all the articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel.find().sort({ createdAt: -1 });

    if (!articles) {
      return res.status(404).json({
        message: "Did not find the articles",
      });
    }

    return res.status(200).json({
      articles,
      message: "fetched articles",
    });
  } catch (err) {
    console.log("Error while Fetching all the articles: ", err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await articleModel.findById(id);
    if (!article) {
      return res.status(404).json({
        message: `article with ${id} is not found `,
      });
    }
    const { updatedContent, references } = req.body;
    if ((!updatedContent, references)) {
      return res.status(400).json({
        message: "All the details are required",
      });
    }

    article.updatedContent = updatedContent;
    article.references = references;
    article.isAiUpdated = isAiUpdated;

    await article.save();

    return res.status(200).json({
      updatedArticle: article,
      message: "Article updated ",
    });
  } catch (err) {
    console.log("Error while updating the article by id: ", err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const id = req.params.id;

    const article = await articleModel.findById(id);
    if (!article) {
      res.status(404).json({
        message: "Article not found ",
      });
    }

    return res.status(200).json({
      article,
      message: "Article fetched successfully ",
    });
  } catch (err) {
    console.log("Error while getting article by id , error : ", error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
