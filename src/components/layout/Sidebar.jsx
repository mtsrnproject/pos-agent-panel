// src/components/layout/Sidebar.jsx

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  Dashboard,
  Devices,
  ReceiptLong,
  Person,
  Logout,
  AdminPanelSettings,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 250;

const menuItems = [
  {
    text: "داشبورد",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    text: "دستگاه‌ها",
    icon: <Devices />,
    path: "/devices",
  },
  {
    text: "فاکتورها",
    icon: <ReceiptLong />,
    path: "/invoices",
  },
  {
    text: "پروفایل",
    icon: <Person />,
    path: "/profile",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#fff",
          borderLeft: "1px solid #eee",
        },
      }}
    >
      {/* Logo */}

      <Box
        sx={{
          p: 4,
          textAlign: "center",
        }}
      >
        {/* تصویر هوبر */}
        <Box
          component="img"
          src="/images/hoober.png"
          alt="هوبر"
          sx={{
            width: 140,
            mb: 2,
            display: "block",
            mx: "auto",
          }}
        />

        <Typography fontWeight={700}>پنل نمایندگان هوبر</Typography>

        <Typography variant="body2" color="text.secondary">
          توزیع و تخصیص دستگاه
        </Typography>
      </Box>

      {/* Menu */}

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.path}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 3,
                mb: 1,

                "&.Mui-selected": {
                  bgcolor: "#E8F0FE",
                  color: "primary.main",

                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Logout */}

      <Box sx={{ mt: "auto", p: 2 }}>
        <ListItemButton
          sx={{
            borderRadius: 3,
            color: "error.main",
          }}
        >
          <ListItemIcon sx={{ color: "error.main" }}>
            <Logout />
          </ListItemIcon>

          <ListItemText primary="خروج" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
