import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";

const initialState = {
  obstacle: [],
  isLoading: false,
  error: null,
};

export const getObstaclesFromReport = createAsyncThunk(
  "obstacles/get",
  async (id) => {
    const { data } = await useGetData(`/api/v1/reports/${id}/obstacles/`);
    return data.data;
  }
);

const obstaclesSlice = createSlice({
  name: "obstaclesSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getObstaclesFromReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getObstaclesFromReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.obstacle = action.payload;
      })
      .addCase(getObstaclesFromReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const obstaclesReducer = obstaclesSlice.reducer;
