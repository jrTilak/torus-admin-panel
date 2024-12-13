import { Fragment } from "react/jsx-runtime"
import { Link, useLocation } from "react-router-dom"

import { AppSidebar } from "@/components/globals/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type Props = {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  const { pathname } = useLocation()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>

                {
                  pathname.split("/").map((path, index, arr) => {
                    if (index === 0) return (
                      <BreadcrumbItem className="hidden md:block" key={index}>
                        <BreadcrumbLink href="#">
                          Torus
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    )
                    return (
                      <Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link to={arr.splice(0, index).join("/")}>{path ?
                              path.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
                              : "Dashboard"}</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </Fragment>
                    )
                  })
                }
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-6 py-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default RootLayout