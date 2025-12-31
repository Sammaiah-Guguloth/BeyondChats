import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { GET_ALL_ARTICLES, GET_ARTICLE_BY_ID } from "../../api/apis";

export const fetchAllArticlesThunk = createAsyncThunk(
  "articles/fetchArticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(GET_ALL_ARTICLES);
      console.log("response : ", response);
      return response.data?.articles;
    } catch (err) {
      console.log("Error while fetching articles in thunk , error : ", err);
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch articles"
      );
    }
  }
);

export const fetchArticleByIdThunk = createAsyncThunk(
  "articles/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${GET_ARTICLE_BY_ID}/${id}`);
      // console.log("response for current article : ", response);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch article details"
      );
    }
  }
);
