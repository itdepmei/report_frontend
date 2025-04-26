import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useDeleteData } from "../hooks/useDeleteData";
import { useInsertData } from "../hooks/useInsertData";

const initialState = {
  obstacle: [],
  isLoading: false,
  error: null,
};

// جلب العوائق
export const getObstaclesFromReport = createAsyncThunk(
  "obstacles/get",
  async (id) => {
    const { data } = await useGetData(`/api/v1/reports/${id}/obstacles/`);
    return data.data;
  }
);

// حذف عائق
export const deleteObstacle = createAsyncThunk(
  "obstacles/delete",
  async (id) => {
    await useDeleteData(`/api/v1/obstacles/${id}`);
    return id;
  }
);

// إضافة عائق
export const addObstacle = createAsyncThunk(
  "obstacles/create",
  async ({ reportId, obstacleData }) => {
    const { data } = await useInsertData(`/api/v1/reports/${reportId}/obstacles/`, obstacleData);
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
      })

      // حذف عائق
      .addCase(deleteObstacle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteObstacle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.obstacle = state.obstacle.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteObstacle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // إضافة عائق
      .addCase(addObstacle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addObstacle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.obstacle.push(action.payload);
      })
      .addCase(addObstacle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const obstaclesReducer = obstaclesSlice.reducer;
