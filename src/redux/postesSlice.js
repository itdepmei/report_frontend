import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getAllPosts = createAsyncThunk("posts-action", async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/v1/reports/"
  );
  return data.data;
});

const PostsSlice = createSlice({
  name: "postsSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const postsReducer = PostsSlice.reducer;
