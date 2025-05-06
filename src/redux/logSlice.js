// features/logs/logSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetData } from '../hooks/useGetData';

const initialState = {
    logs: [],
    loading: false,
    error: null,
};  

// لجلب البيانات من API
export const getLogs = createAsyncThunk('logs/getLogs', async () => {
  const response = await useGetData('/api/v1/logs');
  return response.data.data; 
});

const logSlice = createSlice({
  name: 'logs',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const logReducer = logSlice.reducer;


