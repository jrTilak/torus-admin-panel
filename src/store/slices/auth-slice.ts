import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { handleLoginService, handleLogoutService } from "@/services/auth";
import { User } from "@/services/auth/data";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export const login = createAsyncThunk(
  "auth/login",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await handleLoginService();
      dispatch(setUser(user));
      dispatch(setIsAuthenticated(true));
      return user;
    } catch {
      return rejectWithValue("Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await handleLogoutService();
    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setIsAuthenticated, setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
