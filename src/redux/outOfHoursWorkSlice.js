import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useDeleteData } from "../hooks/useDeleteData";
import { useInsertData } from "../hooks/useInsertData";

const initialState = {
  outOfHoursWork: [],
  isLoading: false,
  error: null,
};

// جلب بيانات العمل خارج الدوام
export const getOutOfHoursWorkFromReport = createAsyncThunk(
  "outOfHoursWork/get",
  async (id) => {
    const { data } = await useGetData(`/api/v1/reports/${id}/outOfHoursWork/`);
    return data.data;
  }
);

// حذف عمل خارج الدوام
export const deleteOutOfHoursWork = createAsyncThunk(
  "outOfHoursWork/delete",
  async (id) => {
    await useDeleteData(`/api/v1/out-of-hours-work/${id}`);
    return id;
  }
);

// إضافة عمل خارج الدوام
export const addOutOfHoursWork = createAsyncThunk(
  "outOfHoursWork/create",
  async ({ reportId, outOfHoursWorkData }) => {
    const { data } = await useInsertData(`/api/v1/reports/${reportId}/outOfHoursWork/`, outOfHoursWorkData);
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
      })

      // حذف
      .addCase(deleteOutOfHoursWork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOutOfHoursWork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.outOfHoursWork = state.outOfHoursWork.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteOutOfHoursWork.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // إضافة
      .addCase(addOutOfHoursWork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOutOfHoursWork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.outOfHoursWork.push(action.payload);
      })
      .addCase(addOutOfHoursWork.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const outOfHoursWorkReducer = outOfHoursWorkSlice.reducer;
