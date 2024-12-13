import { Route, Routes as R } from "react-router-dom"

import RootLayout from "@/components/layouts/root-layout"
import AuthProvider from "@/providers/auth-provider"

import Dashboard from "./dashboard"
import UsersManagement from "./users-management"

const Routes = () => {
  return (
    <AuthProvider>
      <RootLayout>
        <R>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users-management" element={<UsersManagement />} />
          <Route path="*" element={<div>404</div>} />
        </R>
      </RootLayout>
    </AuthProvider>

  )
}

export default Routes