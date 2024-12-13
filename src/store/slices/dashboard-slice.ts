import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  handleGetOverviewService,
  handleGetStatsService
} from "@/services/dashboard";
import {
  HandleGetStatsServiceParams,
  Overview,
  Stats
} from "@/services/dashboard/types";

export interface DashboardState {
  overview: {
    data: Overview | null;
    loading: boolean;
    error: string | null;
  };
  stats: {
    data: Stats | null;
    loading: boolean;
    error: string | null;
  };
  range: {
    from: string;
    to: string;
  };
}

const initialState: DashboardState = {
  overview: {
    data: null,
    loading: false,
    error: null
  },
  stats: {
    data: null,
    loading: false,
    error: null
  },
  range: {
    // from 1 year ago
    from: new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    ).toISOString(),
    // to today
    to: new Date().toISOString()
  }
};

// Thunk for fetching dashboard overview
export const fetchDashboardOverview = createAsyncThunk(
  "dashboard/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const data = await handleGetOverviewService();
      return data;
    } catch {
      return rejectWithValue("Failed to fetch dashboard overview");
    }
  }
);

// Thunk for fetching stats
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (params: HandleGetStatsServiceParams, { rejectWithValue }) => {
    try {
      const data = await handleGetStatsService(params);
      return data;
    } catch {
      return rejectWithValue("Failed to fetch dashboard stats");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setRange: (state, action) => {
      state.range = {
        ...state.range,
        ...action.payload
      };
    }
  },
  extraReducers: (builder) => {
    // Overview reducers
    builder
      .addCase(fetchDashboardOverview.pending, (state) => {
        state.overview.loading = true;
        state.overview.error = null;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.overview.loading = false;
        state.overview.data = action.payload;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.overview.loading = false;
        state.overview.error = action.payload as string;
      });

    // Stats reducers
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.stats.loading = true;
        state.stats.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats.loading = false;
        state.stats.data = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.stats.loading = false;
        state.stats.error = action.payload as string;
      });
  }
});

export const { setRange } = dashboardSlice.actions;
export default dashboardSlice.reducer;
