import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Search } from 'lucide-react'

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useDebouncedValue from "@/hooks/use-debounce-value"
import { useAppSelector } from "@/store"
import { setQuery } from "@/store/slices/user-slice"

const SearchBar = () => {
  const dispatch = useDispatch()
  const { query } = useAppSelector(state => state.user)
  const [searchQuery, setSearchQuery] = useState(query.search?.query || "")

  const debounceQuery = useDebouncedValue(searchQuery, 400)

  useEffect(() => {
    dispatch(setQuery({ search: { query: debounceQuery, by: "name" } }))
  }, [debounceQuery])

  return (
    <div className="flex flex-col @sm:flex-row gap-x-4 gap-y-2">
      <div className="relative w-full @sm:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          value={searchQuery}
          placeholder="Search users..." className="pl-8" />

      </div>
      <Select
        value={query.search?.by || "name"}
        onValueChange={(value) => {
          dispatch(setQuery({ search: { query: debounceQuery, by: value } }))
        }}
      >
        <SelectTrigger className="w-full @sm:w-fit @xl:w-[180px]">
          <SelectValue placeholder="Search by" className="capitalize px-2" />
        </SelectTrigger>
        <SelectContent>
          {
            ["name", "email", "country"].map((item) => (
              <SelectItem key={item} value={item} className="capitalize">{item}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}

export default SearchBar