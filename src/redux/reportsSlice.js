import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useInsertData } from "../hooks/useInsertData"; // تأكد من وجود هذا الهوك

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  singleReport: [],
  createdReport: null, // لتخزين التقرير المضاف
};

// Get all reports
export const getAllReports = createAsyncThunk("reports/getAll", async () => {
  const { data } = await useGetData("/api/v1/reports/");
  return data.data;
});

// Get single report
export const getOneReport = createAsyncThunk("reports/getOne", async (id) => {
  const { data } = await useGetData(`/api/v1/reports/${id}`);
  return data.data;
});

// Create a new report
export const createReport = createAsyncThunk(
  "reports/create",
  async (reportData, thunkAPI) => {
    try {
      const { data } = await useInsertData("/api/v1/reports", reportData);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const ReportSlice = createSlice({
  name: "reportsSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      // Get all reports
      .addCase(getAllReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Get single report
      .addCase(getOneReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleReport = action.payload;
      })
      .addCase(getOneReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Create report
      .addCase(createReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdReport = action.payload;
        state.data.push(action.payload); 
      })
      .addCase(createReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const reportsReducer = ReportSlice.reducer;
