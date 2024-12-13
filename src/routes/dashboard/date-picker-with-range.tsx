"use client"
import * as React from "react"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/helpers/cn"
import { useAppDispatch, useAppSelector } from "@/store"
import { setRange } from "@/store/slices/dashboard-slice"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [rangeType, setRangeType] = React.useState("last-year")
  const { range } = useAppSelector((state) => state.dashboard)
  const dispatch = useAppDispatch()
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(range.from),
    to: new Date(range.to),
  })

  const handleSelectChange = (value: string) => {
    setRangeType(value)
    // set to : to today
    const to = new Date().toISOString()
    let form = new Date().toISOString()

    switch (value) {
      case "last-week":
        form = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
        break
      case "last-month":
        form = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
        break
      case "last-3-months":
        form = new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString()
        break
      case "last-6-months":
        form = new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString()
        break
      case "last-year":
        form = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()
        break
      default:
        break
    }

    setDate({
      from: new Date(form),
      to: new Date(to),
    })
  }

  return (
    <div className="flex flex-wrap items-end gap-4 py-6">
      <div className="">
        <Label htmlFor="custom-date">
          Pick a range:
        </Label>

        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto" align="start">
              <Select
                value={rangeType}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {
                    [
                      {
                        label: "From Last Week",
                        value: "last-week",
                      },
                      {
                        label: "From Last Month",
                        value: "last-month",
                      },
                      {
                        label: "From Last 3 Months",
                        value: "last-3-months",
                      },
                      {
                        label: "From Last 6 Months",
                        value: "last-6-months",
                      },
                      {
                        label: "From Last Year",
                        value: "last-year",
                      },
                      {
                        label: "Custom Range",
                        value: "custom-range",
                      }
                    ].map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <div>
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(date) => {
                    setRangeType("custom-range")
                    setDate(date)
                  }}
                  numberOfMonths={2}
                />
              </div>

            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button
        onClick={() => {
          dispatch(setRange({ from: date?.from?.toISOString(), to: date?.to?.toISOString() }))
        }}
      >Apply Filters</Button>
    </div>
  )
}
