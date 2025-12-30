import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../redux/slices/articles.slice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
