require("dotenv").config();
const express = require("express");
const scrapeBeyondChats = require("./utils/scraper");
const connectToDB = require("./config/connectToDB");
const cors = require("cors");
const articleRouter = require("./routes/article.routes");
const { getCompetitorLinks } = require("./scripts/services/search.service");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectToDB();

// Middlewares
app.use(
  cors({
    // origin: process.env.CLIENT_URL || "*",
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "BeyondChats Assignment API is runnig." });
});

app.use("/api/v1/articles", articleRouter);

app.listen(PORT, () => {
  console.log("server is listening on port : ", PORT);
});
