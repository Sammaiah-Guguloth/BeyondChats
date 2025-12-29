const express = require("express");
const { initializeDatabase } = require("../controllers/article.controller");
router = express.Router();

router.post("/seed", initializeDatabase);

module.exports = router;
