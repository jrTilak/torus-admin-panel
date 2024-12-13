
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User } from "@/services/users/types"

interface UserDetailsDialogProps {
  user: User | null
  onClose: () => void
}

export default function UserDetailsDialog({ user, onClose }: UserDetailsDialogProps) {
  if (!user) return null

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information about the user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">ID</p>
              <p>{user.id}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <Badge variant={user.status === "active" ? "outline" : "destructive"}>
                {user.status}
              </Badge>
            </div>
            <div>
              <p className="font-semibold">Country</p>
              <p>{user.country}</p>
            </div>
            <div>
              <p className="font-semibold">Created At</p>
              <p>{user.createdAt}</p>
            </div>
            <div>
              <p className="font-semibold">Deleted</p>
              <p>{user.isDeleted ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          {user.isDeleted ? (
            <Button
              onClick={() => {
                toast.error("Feature not implemented yet")
              }}
              variant="default">Restore User</Button>
          ) : (
            <Button
              onClick={() => {
                toast.error("Feature not implemented yet")
              }}
              variant="destructive">Delete User</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

