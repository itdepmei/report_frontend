import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";

const initialState = {
  task: [],
  isLoading: false,
  error: null,
};

export const getTasksFromReport = createAsyncThunk("tasks/get", async (id) => {
  const { data } = await useGetData(`/api/v1/reports/${id}/tasks/`);
  return data.data;
});

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTasksFromReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksFromReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task = action.payload;
      })
      .addCase(getTasksFromReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
