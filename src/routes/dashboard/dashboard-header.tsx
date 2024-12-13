import { Separator } from "@/components/ui/separator"
import { cn } from "@/helpers/cn"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({
  heading,
  text,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between px-2", className)}>
      <div className="grid gap-1 w-full">
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
        <Separator />
      </div>
      {children}
    </div>
  )
}

