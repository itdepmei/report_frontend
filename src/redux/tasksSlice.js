import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useDeleteData } from "../hooks/useDeleteData";
import { useInsertData } from "../hooks/useInsertData";
import { useUpdateData } from "../hooks/useUpdateData";

const initialState = {
  task: [],
  singleTask: null, // ✅ أضفناها لتخزين تاسك واحدة
  isLoading: false,
  error: null,
};

// ✅ جلب جميع المهام لتقرير
export const getTasksFromReport = createAsyncThunk("tasks/get", async (id) => {
  const { data } = await useGetData(`/api/v1/reports/${id}/tasks/`);
  return data.data;
});

// ✅ جلب مهمة واحدة
export const getOneTask = createAsyncThunk("tasks/getOne", async (id) => {
  const { data } = await useGetData(`/api/v1/tasks/${id}/`);
  return data.data;
});

// ✅ حذف مهمة
export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await useDeleteData(`/api/v1/tasks/${id}/`);
  return id;
});

// ✅ إضافة مهمة
export const addTask = createAsyncThunk("tasks/add", async ({ reportId, taskData }) => {
  const { data } = await useInsertData(`/api/v1/reports/${reportId}/tasks/`, taskData);
  return data.data;
});

// ✅ تحديث مهمة
export const updateTask = createAsyncThunk("tasks/update", async ({ id, updatedData }) => {
  const { data } = await useUpdateData(`/api/v1/tasks/${id}/`, updatedData);
  return data.data;
});

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      // ✅ get all
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
      })

      // ✅ get one
      .addCase(getOneTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleTask = action.payload;
      })
      .addCase(getOneTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // ✅ delete
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task = state.task.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // ✅ add
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // ✅ update
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.task.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.task[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
