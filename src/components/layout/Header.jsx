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

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
