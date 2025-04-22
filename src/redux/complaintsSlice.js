import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
const initialState = {
  complaint: [],
  isLoading: false,
  error: null,
};

export const getComplaintFromReport = createAsyncThunk(
  "complaints/get",
  async (id) => {
    const { data } = await useGetData(`/api/v1/reports/${id}/complaints/`
    );
    return data.data;
  }
);

const complaintsSlice = createSlice({
  name: "complaintsSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getComplaintFromReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComplaintFromReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaint = action.payload;
      })
      .addCase(getComplaintFromReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const complaintsReducer = complaintsSlice.reducer;
