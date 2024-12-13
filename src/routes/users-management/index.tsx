import { useEffect } from "react"

import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchUsers } from "@/store/slices/user-slice"

import FilterButton from "./filter-button"
import Pagination from "./pagination"
import SearchBar from "./search-bar"
import UserTable from "./user-table"

const UserManagementPage = () => {
  const { query } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers(query));
  }, [query])


  return (
    <div className="@container">
      <h1 className="text-2xl font-semibold">User Management</h1>
      <Separator className="my-4" />
      <div className="flex flex-col @lg:flex-row gap-y-2 mb-6 @lg:justify-between">
        <SearchBar />
        <FilterButton />
      </div>
      <UserTable />
      <div className="mt-6 flex justify-center">
        <Pagination />
      </div>
    </div>
  )
}

export default UserManagementPage