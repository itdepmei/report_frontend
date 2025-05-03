import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetDataToken } from "../hooks/useGetData";
import { useInsertDataWithToken } from "../hooks/useInsertData";
import { useDeleteData } from "../hooks/useDeleteData";
import { useUpdateDataWithToken } from "../hooks/useUpdateData";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  singleReport: [],
  createdReport: null,
  sendReport: [],
  updatedSendReport: null,
  reportsByDate: [],
};

// Get all reports
export const getAllReports = createAsyncThunk("reports/getAll", async () => {
  const { data } = await useGetDataToken("/api/v1/reports/");
  return data.data;
});

// Get reports by date and department
export const getReportsByDate = createAsyncThunk(
  "reports/getByDate",
  async (params = {}, thunkAPI) => {
    try {
      const { date, department } = params;

      let url = "/api/v1/reports/sendToAssistant/";
      const queryParams = [];

      if (date) queryParams.push(`date=${date}`);
      if (department)
        queryParams.push(`department=${encodeURIComponent(department)}`);

      if (queryParams.length > 0) {
        url += "?" + queryParams.join("&");
      }

      const { data } = await useGetDataToken(url);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get single report
export const getOneReport = createAsyncThunk("reports/getOne", async (id) => {
  const { data } = await useGetDataToken(`/api/v1/reports/${id}`);
  return data.data;
});

// Get send reports
export const getSendReport = createAsyncThunk("reports/getSend", async () => {
  const { data } = await useGetDataToken(`/api/v1/reports/sendToAssistant/`);
  return data.data;
});

// Create a new report
export const createReport = createAsyncThunk(
  "reports/create",
  async (reportData, thunkAPI) => {
    try {
      const { data } = await useInsertDataWithToken(
        "/api/v1/reports",
        reportData
      );
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Delete report
export const deleteReport = createAsyncThunk(
  "reports/delete",
  async (id, thunkAPI) => {
    try {
      await useDeleteData(`/api/v1/reports/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Send report to assistant (PUT)
export const sendReportToAssistant = createAsyncThunk(
  "reports/sendToAssistant",
  async (id, thunkAPI) => {
    try {
      const { data } = await useUpdateDataWithToken(
        `/api/v1/reports/${id}/sendToAssistant/`,
        {}
      );
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

      // Get send reports
      .addCase(getSendReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSendReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sendReport = action.payload;
      })
      .addCase(getSendReport.rejected, (state, action) => {
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
      })

      // Delete report
      .addCase(deleteReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (report) => report._id !== action.payload
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Send report to assistant
      .addCase(sendReportToAssistant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendReportToAssistant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updatedSendReport = action.payload;
      })
      .addCase(sendReportToAssistant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get reports by date
      .addCase(getReportsByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReportsByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportsByDate = action.payload;
      })
      .addCase(getReportsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const reportsReducer = ReportSlice.reducer;
