import authService from "./authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let authDetails = undefined;

const initialState = {
  authDetails: authDetails ? authDetails : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    let message;
    if (error?.response?.data?.message[0]) {
      message = error.response.data.message[0];
    } else {
      message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      let message;
      if (error?.response?.data?.message[0]) {
        message = error.response.data.message[0];
      } else {
        message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = "");
    },
    resetAuthDetails: (state) => {
      state.authDetails = null;
    },
    setAuthDetails: (state, action) => {
      state.authDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authDetails = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload);
        state.authDetails = null;
      })
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authDetails = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload);
        state.authDetails = null;
      })
  },
});

export const { reset, resetAuthDetails, setAuthDetails } = authSlice.actions;
export default authSlice.reducer;
