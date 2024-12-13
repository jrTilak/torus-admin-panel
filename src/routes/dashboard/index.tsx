import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@/store"
import { fetchDashboardStats } from "@/store/slices/dashboard-slice"

import { DashboardHeader } from "./dashboard-header"
import { DashboardShell } from "./dashboard-shell"
import { DatePickerWithRange } from "./date-picker-with-range"
import { OverviewCards } from "./overview-cards"
import { UserCharts } from "./user-charts"

export default function DashboardPage() {

  const { range } = useAppSelector((state) => state.dashboard)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchDashboardStats(range));
  }, [range])



  return (
    <DashboardShell>
      <DashboardHeader
        heading="User Dashboard"
        text="Monitor and analyze user statistics and activities."
      />
      <div className="grid gap-4 @md:grid-cols-2 @2xl:grid-cols-4">
        <OverviewCards />
      </div>
      <DatePickerWithRange />
      <div className="grid gap-4 md:grid-cols-3">
        <UserCharts />
      </div>
    </DashboardShell>
  )
}

