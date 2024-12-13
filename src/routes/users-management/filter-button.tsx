"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Filter } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import useDebouncedValue from "@/hooks/use-debounce-value"
import { setQuery } from "@/store/slices/user-slice"

export default function FilterButton() {
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({
    status: "all",
    includeDeleted: true
  })

  const debouncedFilters = useDebouncedValue(filters, 400)

  useEffect(() => {
    let query = {}

    if (debouncedFilters.status !== "all") {
      query = {
        ...query,
        status: debouncedFilters.status,
      }
    } else {
      query = {
        ...query,
        status: undefined
      }
    }

    query = {
      ...query,
      includeDeleted: debouncedFilters.includeDeleted
    }

    dispatch(setQuery(query))

  }, [debouncedFilters])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full @sm:w-[100px]">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit" side="bottom" align="start">
        <div className="grid gap-2">
          <div className="space-y-2">
            <h5 className="font-medium text-sm">Status</h5>
            <RadioGroup
              value={filters.status}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inactive" id="inactive" />
                <Label htmlFor="inactive">Inactive</Label>
              </div>
            </RadioGroup>
          </div>
          <Separator />
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filters.includeDeleted}
              onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, includeDeleted: checked === "indeterminate" ? false : checked }))}
              id="deleted" />
            <Label htmlFor="deleted">Include deleted users</Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

