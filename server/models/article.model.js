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
    // Changed to an array of objects to support semantic structure
    originalContent: [
      {
        type: {
          type: String,
          required: true,
          enum: ["heading", "paragraph", "list-item"],
        },
        tag: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
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
