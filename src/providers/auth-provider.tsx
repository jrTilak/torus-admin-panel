import NotAuthorized from "@/components/blocks/not-authorized"
import useAuth from "@/services/auth/hooks"

type Props = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const { isAuthenticated, } = useAuth()

  if (isAuthenticated) return children
  return <NotAuthorized />

}

export default AuthProvider