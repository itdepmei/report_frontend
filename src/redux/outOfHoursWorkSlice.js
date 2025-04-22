import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";

const initialState = {
  outOfHoursWork: [],
  isLoading: false,
  error: null,
};

export const getOutOfHoursWorkFromReport = createAsyncThunk(
  "outOfHoursWork/get",
  async (id) => {
    const { data } = await useGetData(`/api/v1/reports/${id}/outOfHoursWork/`);
    return data.data;
  }
);

const outOfHoursWorkSlice = createSlice({
  name: "outOfHoursWorkSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getOutOfHoursWorkFromReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOutOfHoursWorkFromReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.outOfHoursWork = action.payload;
      })
      .addCase(getOutOfHoursWorkFromReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const outOfHoursWorkReducer = outOfHoursWorkSlice.reducer;
