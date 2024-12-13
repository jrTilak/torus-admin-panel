
import { Button } from '@/components/ui/button'
import useAuth from '@/services/auth/hooks'

const NotAuthorized = () => {
  const { handleLogin } = useAuth()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <img
            src="/images/stop.png"
            alt="Not Authorized"
            width={240}
            height={240}
            className="rounded-lg"
          />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold ">Not Authorized</h1>
          <p className="text-xl text-muted-foreground">
            Please log in to access the dashboard.
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={handleLogin}
            className="w-full max-w-xs">
            Log In
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotAuthorized