import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllArticlesThunk,
  fetchArticleByIdThunk,
} from "../thunks/articles.thunk";

const initialState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    // Keep your manual reducers if needed for local updates
  },
  extraReducers: (builder) => {
    builder
      // Handle Fetch All
      .addCase(fetchAllArticlesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllArticlesThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure this matches your API response structure!
        state.articles = action.payload || [];
      })
      .addCase(fetchAllArticlesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* --- NEW: Single Article Cases --- */
      .addCase(fetchArticleByIdThunk.pending, (state) => {
        state.loading = true;
        state.currentArticle = null; // Clear previous article while loading
        state.error = null;
      })
      .addCase(fetchArticleByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload; // This fixes the "Article not found" bug
      })
      .addCase(fetchArticleByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articlesSlice.reducer;
