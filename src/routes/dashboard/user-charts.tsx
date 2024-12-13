import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from "@/store"

export function UserCharts() {
  const { stats: { data, error, loading } } = useAppSelector((state) => state.dashboard)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  console.log(data)

  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>User Registration Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.userRegistrationsTrend}>
              <XAxis dataKey="label" />
              <YAxis />
              <Line type="monotone" dataKey="users" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3 @5xl:col-span-2">
        <CardHeader>
          <CardTitle>Users by Region</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.usersByRegionData}>
              <XAxis dataKey="region" />
              <YAxis />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card
        className="@5xl:col-span-1 col-span-3"
      >
        <CardHeader>
          <CardTitle>Active vs Inactive Users</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data?.usersStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={
                  ({ label, value }) => `${label} - ${value}`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

