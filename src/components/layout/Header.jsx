// src/components/layout/Header.jsx
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import { Menu, AccountCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Header = () => {
  const navigate = useNavigate();
  const user = authService.getStoredUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      // Even if logout API fails, clear local data
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "white", color: "black", boxShadow: 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          خوش آمدید
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user && <Typography variant="body2">{user}</Typography>}
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
