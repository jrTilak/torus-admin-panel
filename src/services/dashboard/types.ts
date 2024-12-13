export type Overview = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newUsersLastMonth: number;
};

export type HandleGetOverviewServiceReturn = Overview;

export type Stats = {
  userRegistrationsTrend: {
    label: string;
    users: number;
  }[];
  usersStatusData: {
    label: string;
    value: number;
  }[];
  usersByRegionData: {
    region: string;
    users: number;
  }[];
};

export type HandleGetStatsServiceReturn = Stats;

export type HandleGetStatsServiceParams = {
  from: string;
  to: string;
};
