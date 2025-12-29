const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    sourceUrl: {
      type: String,
      trim: true,
    },
    originalContent: {
      type: String,
      required: true,
    },
    updatedContent: {
      type: String,
      default: null,
    },
    references: [{ type: String }],
    isAiUpdated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
