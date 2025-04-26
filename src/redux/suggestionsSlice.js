import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useDeleteData } from "../hooks/useDeleteData";
import { useInsertData } from "../hooks/useInsertData";

const initialState = {
  suggestion: [],
  isLoading: false,
  error: null,
};

// جلب الاقتراحات
export const getSuggestionsFromReport = createAsyncThunk(
  "suggestions/get",
  async (id) => {
    const { data } = await useGetData(`/api/v1/reports/${id}/suggestions/`);
    return data.data;
  }
);

// حذف اقتراح
export const deleteSuggestion = createAsyncThunk(
  "suggestions/delete",
  async (id) => {
    await useDeleteData(`/api/v1/suggestions/${id}`);
    return id;
  }
);

// إضافة اقتراح
export const addSuggestion = createAsyncThunk(
  "suggestions/create",
  async ({ reportId, suggestionData }) => {
    console.log(reportId, suggestionData);
    const { data } = await useInsertData(`/api/v1/reports/${reportId}/suggestions/`, suggestionData);
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
      })

      // حذف اقتراح
      .addCase(deleteSuggestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSuggestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestion = state.suggestion.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteSuggestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // إضافة اقتراح
      .addCase(addSuggestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSuggestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestion.push(action.payload);
      })
      .addCase(addSuggestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const suggestionsReducer = suggestionsSlice.reducer;
