import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { login, logout } from "@/store/slices/auth-slice";

const useAuth = () => {
  const { isAuthenticated, user, loading, error } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(() => {
    dispatch(login()); // Dispatch the login thunk
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout()); // Dispatch the logout thunk
  }, [dispatch]);

  return { isAuthenticated, user, loading, error, handleLogin, handleLogout };
};

export default useAuth;
