import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useDeleteData } from "../hooks/useDeleteData";

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

      // حالات الحذف
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
      });
  },
});

export const suggestionsReducer = suggestionsSlice.reducer;
