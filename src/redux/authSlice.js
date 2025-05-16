import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useInsertData } from "../hooks/useInsertData";
import { useGetDataToken } from "../hooks/useGetData";
import { useDeleteDataWithToken } from "../hooks/useDeleteData";
import { useUpdateDataWithToken } from "../hooks/useUpdateData";

const initialState = {
  user: [],
  allUsers: [],
  isLoading: false,
  error: null,
};

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const { data } = await useInsertData("/api/v1/auth/signup/", userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await useInsertData("/api/v1/auth/login", credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get All Users
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const { data } = await useGetDataToken("/api/v1/users/getAllUser");
      return data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const { data } = await useDeleteDataWithToken(`/api/v1/users/${userId}`, null, "DELETE");
      return { userId, message: data?.message || "User deleted successfully" };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Change My Password
export const changeMyPassword = createAsyncThunk(
  "auth/changeMyPassword",
  async (passwordData, thunkAPI) => {
    try {
      const { data } = await useUpdateDataWithToken("/api/v1/users/changeMyPassword", passwordData);
      return data?.message || "Password changed successfully";
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload.userId
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Change My Password
      .addCase(changeMyPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeMyPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user = action.payload;
        state.error = null;
      })
      .addCase(changeMyPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
