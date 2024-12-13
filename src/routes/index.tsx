import { Route, Routes as R } from "react-router-dom"

import RootLayout from "@/components/layouts/root-layout"
import AuthProvider from "@/providers/auth-provider"

import Login from "./auth/login"
import Signup from "./auth/signup/page"
import Dashboard from "./dashboard"
import UsersManagement from "./users-management"

const Routes = () => {
  return (
    <AuthProvider>
      <RootLayout>
        <R>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users-management" element={<UsersManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </R>
      </RootLayout>
    </AuthProvider>

  )
}

export default Routes