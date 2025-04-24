import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useDeleteData } from "../hooks/useDeleteData"; // تأكد من وجود هذا الملف

const initialState = {
  complaint: [],
  isLoading: false,
  error: null,
};

// جلب الشكاوى
export const getComplaintFromReport = createAsyncThunk(
  "complaints/get",
  async (id) => {
    const { data } = await useGetData(`/api/v1/reports/${id}/complaints/`);
    return data.data;
  }
);

// حذف شكوى
export const deleteComplaint = createAsyncThunk(
  "complaints/delete",
  async (id) => {
    await useDeleteData(`/api/v1/complaints/${id}`);
    return id; // نعيد الـ id لكي نحذفه من الـ state
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
      })

      // حالات حذف الشكوى
      .addCase(deleteComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaint = state.complaint.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const complaintsReducer = complaintsSlice.reducer;
