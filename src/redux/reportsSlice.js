import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  singleReport: [], 
};

export const getAllReports = createAsyncThunk("reports/getAll", async () => {
  const { data } = await axios.get("http://localhost:8000/api/v1/reports/");
  return data.data;
});

export const getOneReport = createAsyncThunk(
  "reports/getOne",
  async (id) => {
    const { data } = await axios.get(`http://localhost:8000/api/v1/reports/${id}`);
    
    return data.data;
  }
);

const ReportSlice = createSlice({
  name: "reportsSlice",
  initialState,

  extraReducers: (builder) => {
    builder
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

      .addCase(getOneReport.pending, (state) => {
        state.isLoading = true;
        // state.singleReport = null; 
      })
      .addCase(getOneReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleReport = action.payload;
      })
      .addCase(getOneReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const reportsReducer = ReportSlice.reducer;
