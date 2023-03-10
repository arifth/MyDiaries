import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await authService.register(username, email, password);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await authService.login(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const initialState = {
  user: "",
  isLoggedIn: false,
  userId: 0,
  status: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN_SUCCESS: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("token", action.payload.data.access_token);
    },
    LOGOUT: (state, action) => {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.status = "success";
    },
    [register.pending]: (state, action) => {
      state.isLoggedIn = pending;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.status = "failed";
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.status = "success";
    },
    [login.pending]: (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload.user;
      state.status = "pending";
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.status = "rejected";
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { LOGIN_SUCCESS } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;
