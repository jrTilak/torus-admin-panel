import * as React from "react"
import { Link } from "react-router-dom"
import {
  PieChart,
  User2Icon,
} from "lucide-react"

import { TeamSwitcher } from "@/components/globals/sidebar/team-info"
import UserInfo from "@/components/globals/sidebar/user-info"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,  SidebarRail} from "@/components/ui/sidebar"

const NAV_LINKS = [
  {
    name: "Dashboard",
    url: "/",
    icon: PieChart,
  },
  {
    name: "Users Management",
    url: "/users-management",
    icon: User2Icon,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Let&apos;s get started
          </SidebarGroupLabel>
          <SidebarMenu>
            {NAV_LINKS.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserInfo />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
