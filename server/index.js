require("dotenv").config();
const express = require("express");
const scrapeBeyondChats = require("./utils/scraper");

const app = express();

// // 1. Connect to Database
// connectDB();

// 2. Essential Middlewares
// app.use(cors({
//     origin: process.env.CLIENT_URL || '*', // Allow requests from your Netlify URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "BeyondRefine API is running smoothly." });
});

scrapeBeyondChats();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
