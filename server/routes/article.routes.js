const express = require("express");
const {
  initializeDatabase,
  getAllArticles,
  updateArticleById,
  getArticleById,
} = require("../controllers/article.controller");
router = express.Router();

router.post("/seed", initializeDatabase);
router.get("/", getAllArticles);
router.put("/:id", updateArticleById);
router.get("/:id", getArticleById);

module.exports = router;
