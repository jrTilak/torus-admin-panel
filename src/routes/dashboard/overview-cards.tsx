import { useEffect } from "react";
import { UserCheck, UserMinus, UserPlus,Users } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchDashboardOverview } from "@/store/slices/dashboard-slice";

export function OverviewCards() {
  const { data, loading, error } = useAppSelector((state) => state.dashboard.overview);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDashboardOverview());
  }, []);

  if (error) return null
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Users
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : data?.totalUsers}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Users
          </CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : data?.activeUsers}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Inactive Users
          </CardTitle>
          <UserMinus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : data?.inactiveUsers}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            New Users (Last Month)
          </CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : data?.newUsersLastMonth}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

