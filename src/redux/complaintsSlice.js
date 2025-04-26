import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useDeleteData } from "../hooks/useDeleteData";
import { useInsertData } from "../hooks/useInsertData";

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
    return id;
  }
);

// إضافة شكوى
export const addComplaint = createAsyncThunk(
  "complaints/create",
  async ({ reportId, complaintData }) => {
    const { data } = await useInsertData(`/api/v1/reports/${reportId}/complaints/`, complaintData);
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
      })

      // حذف شكوى
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
      })

      // إضافة شكوى
      .addCase(addComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaint.push(action.payload);
      })
      .addCase(addComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const complaintsReducer = complaintsSlice.reducer;
