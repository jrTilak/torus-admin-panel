import users from "@/db/users.json";
import compact from "@/helpers/compact";

import {
  HandleGetOverviewServiceReturn,
  HandleGetStatsServiceParams,
  HandleGetStatsServiceReturn
} from "./types";

export const handleGetOverviewService =
  async (): Promise<HandleGetOverviewServiceReturn> => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "active").length;
    const inactiveUsers = users.filter(
      (user) => user.status === "inactive"
    ).length;
    const newUsersLastMonth = users.filter((user) => {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return new Date(user.createdAt) > lastMonth;
    }).length;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      newUsersLastMonth
    };
  };

export const handleGetStatsService = async (
  params: HandleGetStatsServiceParams
): Promise<HandleGetStatsServiceReturn> => {
  const fromDate = new Date(params.from);
  const toDate = new Date(params.to);

  // Filter users within the date range
  const filteredUsers = users.filter((user) => {
    const createdAt = new Date(user.createdAt);
    return createdAt >= fromDate && createdAt <= toDate;
  });

  const dateDiff = toDate.getTime() - fromDate.getTime();
  const daysDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
  const yearDiff = toDate.getFullYear() - fromDate.getFullYear();

  // Dynamic user registration trend logic
  //@ts-expect-error: Variable userRegistrationsTrend implicitly has type in some locations where its type cannot be determined.
  let userRegistrationsTrend = [];

  if (daysDiff <= 7) {
    // Day-based (e.g., Sunday, Monday)
    userRegistrationsTrend = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(fromDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dayLabel = day.toLocaleDateString("en-US", { weekday: "long" });
      return {
        label: dayLabel,
        users: filteredUsers.filter(
          (user) =>
            new Date(user.createdAt).toLocaleDateString("en-US", {
              weekday: "long"
            }) === dayLabel
        ).length
      };
    });
  } else if (daysDiff > 7 && daysDiff <= 30) {
    // Weekly (e.g., Week 1, Week 2)
    userRegistrationsTrend = Array.from(
      { length: Math.ceil(daysDiff / 7) },
      (_, i) => {
        const weekStart = new Date(
          fromDate.getTime() + i * 7 * 24 * 60 * 60 * 1000
        );
        const weekEnd = new Date(
          Math.min(
            weekStart.getTime() + 6 * 24 * 60 * 60 * 1000,
            toDate.getTime()
          )
        );
        const weekLabel = `Week ${i + 1}`;
        return {
          label: weekLabel,
          users: filteredUsers.filter((user) => {
            const createdAt = new Date(user.createdAt);
            return createdAt >= weekStart && createdAt <= weekEnd;
          }).length
        };
      }
    );
  } else if (yearDiff === 0 || (daysDiff > 30 && yearDiff === 1)) {
    // Monthly (e.g., Jan, Feb) if within a single year or exactly one year
    userRegistrationsTrend = Array.from({ length: 12 }, (_, i) => {
      const month = new Date(
        fromDate.getFullYear(),
        fromDate.getMonth() + i,
        1
      );
      if (month > toDate) return null; // Stop if out of range
      const monthLabel = month.toLocaleDateString("en-US", { month: "short" });
      return {
        label: monthLabel,
        users: filteredUsers.filter(
          (user) =>
            new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short"
            }) === monthLabel
        ).length
      };
    }).filter(Boolean);
  } else if (yearDiff > 1) {
    // Yearly (e.g., 2021, 2022) if more than one year
    userRegistrationsTrend = Array.from(
      new Set(
        filteredUsers.map((user) =>
          new Date(user.createdAt).getFullYear().toString()
        )
      )
    ).map((year) => ({
      label: year,
      users: filteredUsers.filter(
        (user) => new Date(user.createdAt).getFullYear().toString() === year
      ).length
    }));
  }

  // Calculate user status data
  const usersStatusData = [
    {
      label: "Active",
      value: filteredUsers.filter((u) => u.status === "active").length
    },
    {
      label: "Inactive",
      value: filteredUsers.filter((u) => u.status === "inactive").length
    },
    {
      label: "Deleted",
      value: filteredUsers.filter((u) => u.isDeleted).length
    }
  ];

  // Calculate users by region
  const regions = Array.from(
    new Set(filteredUsers.map((user) => user.country))
  ).map((region) => ({
    region,
    users: filteredUsers.filter((user) => user.country === region).length
  }));

  // Sort regions by user count in descending order
  const sortedRegions = regions.sort((a, b) => b.users - a.users);

  // Limit to 9 regions and group remaining into "Others"
  const topRegions = sortedRegions.slice(0, 9);
  const othersUsersCount = sortedRegions
    .slice(9)
    .reduce((total, region) => total + region.users, 0);

  if (othersUsersCount > 0) {
    topRegions.push({ region: "Others", users: othersUsersCount });
  }

  return {
    //@ts-expect-error: Variable 'userRegistrationsTrend' implicitly has an 'any[]' type
    userRegistrationsTrend: compact(userRegistrationsTrend),
    usersStatusData,
    usersByRegionData: topRegions
  };
};
