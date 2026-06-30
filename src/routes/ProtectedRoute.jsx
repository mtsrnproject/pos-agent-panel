import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoute = () => {
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
