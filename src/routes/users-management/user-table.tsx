"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/helpers/cn"
import { User } from "@/services/users/types"
import { useAppSelector } from "@/store"
import { setQuery } from "@/store/slices/user-slice"

import UserDetailsDialog from "./user-details-dialog"

export default function UserTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { query, users, pagination } = useAppSelector(state => state.user)
  const dispatch = useDispatch()
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {
              [
                {
                  label: "SN"
                },
                {
                  label: "Name",
                  key: "name",
                },
                {
                  label: "Email",
                  className: "hidden @3xl:table-cell",
                  key: "email"
                },
                {
                  label: "Status",
                  key: "status",
                  className: "hidden @5xl:table-cell"
                },
                {
                  label: "Country",
                  key: "country",
                  className: "hidden @6xl:table-cell"
                },
                {
                  label: "Created At",
                  key: "createdAt",
                  className: "hidden @lg:table-cell"
                },
                {
                  label: "Actions",
                }
              ].map((header) => (
                <TableHead key={header.label}
                  className={cn(header.className)}
                >
                  <button
                    onClick={() => {
                      if (!header.key) return
                      dispatch(setQuery({ sort: { by: header.key, order: query?.sort?.order === "asc" ? "desc" : "asc" } }))
                    }}
                    className={cn("flex items-center justify-center", header.key ? "cursor-pointer" : "cursor-default")}
                  >
                    {header.label}
                    {
                      header.key && (
                        <span
                          className="ml-2.5 text-lg p-1"

                        >
                          {query?.sort?.by === header.key ? query.sort.order === "asc" ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" /> : ""}
                        </span>
                      )
                    }
                  </button>
                </TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, i) => (
            <TableRow key={user.id} className={user.isDeleted ? "bg-destructive/5" : ""}>
              <TableCell className="font-medium">
                {pagination?.page ? (pagination.page - 1) * pagination.limit + i + 1 : i + 1}.
              </TableCell>
              <TableCell className="font-medium">
                {user.name}
              </TableCell>
              <TableCell
                className="hidden @3xl:table-cell"
              >{user.email}</TableCell>
              <TableCell
                className="hidden @5xl:table-cell"
              >
                <Badge
                  variant={user.status === "active" ? "outline" : "destructive"}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell
                className="hidden @6xl:table-cell"
              >{user.country}</TableCell>
              <TableCell
                className="hidden @lg:table-cell"
              >{user.createdAt}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => setSelectedUser(user as User)}>
                  <span className="hidden @lg:inline">
                    View Details
                  </span>
                  <span className="@lg:hidden">
                    View
                  </span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedUser && (
        <UserDetailsDialog user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  )
}

