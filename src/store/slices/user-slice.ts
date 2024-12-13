import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { handleGetUsersService } from "@/services/users";
import {
  HandleGetUsersServiceProps,
  Pagination,
  User
} from "@/services/users/types";

// Define the type for the response from the service
export interface UsersState {
  users: User[] | null;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  query: HandleGetUsersServiceProps;
}

const initialState: UsersState = {
  users: null,
  pagination: null,
  loading: false,
  error: null,
  query: {
    includeDeleted: true,
    limit: 5,
    page: 1,
    search: {
      by: "name",
      query: ""
    },
    sort: {
      by: "createdAt",
      order: "desc"
    }
  }
};

export const fetchUsers = createAsyncThunk(
  "users/fetch-users",
  async (queries: HandleGetUsersServiceProps) => {
    const response = await handleGetUsersService(queries);
    return response;
  }
);

// Create slice for users
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = {
        ...state.query,
        ...action.payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.result;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  }
});

export const { setQuery } = usersSlice.actions;

export default usersSlice.reducer;
