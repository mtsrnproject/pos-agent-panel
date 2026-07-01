import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import authService from "../services/authService";

const ProtectedRoute = () => {
  // بررسی سریع localStorage / کوکی
  const [status, setStatus] = useState(
    authService.isLoggedIn() ? "ok" : "checking",
  );

  useEffect(() => {
    if (status !== "checking") return;
    // اگر localStorage خالی بود، session Frappe را چک کن
    authService.getSessionUser().then((user) => {
      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        setStatus("ok");
      } else {
        setStatus("denied");
      }
    });
  }, []);

  if (status === "checking") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "denied") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
