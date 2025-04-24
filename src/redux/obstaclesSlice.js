import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useDeleteData } from "../hooks/useDeleteData"; // تأكد من وجود هذا

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

      // حالات الحذف
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
      });
  },
});

export const obstaclesReducer = obstaclesSlice.reducer;
