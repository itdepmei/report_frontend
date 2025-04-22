import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";

const initialState = {
  suggestion: [],
  isLoading: false,
  error: null,
};

export const getSuggestionsFromReport = createAsyncThunk(
  "suggestions/get",
  async (id) => {
    const { data } = await useGetData(`/api/v1/reports/${id}/suggestions/`);
    console.log("tasks", data);
    return data.data;
  }
);

const suggestionsSlice = createSlice({
  name: "suggestionsSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getSuggestionsFromReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuggestionsFromReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestion = action.payload;
      })
      .addCase(getSuggestionsFromReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const suggestionsReducer = suggestionsSlice.reducer;
