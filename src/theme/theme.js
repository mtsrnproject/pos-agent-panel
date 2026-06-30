// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#007f7e",
      light: "#33999899", // ~15% lighter
      dark: "#005958", // ~30% darker
      contrastText: "#fff",
    },
    secondary: {
      main: "#bcbec0",
      light: "#d4d5d7",
      dark: "#8e9092",
      contrastText: "#111827", // متن تیره روی خاکستری روشن
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    info: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
      disabled: "#9CA3AF",
    },
    divider: "#E5E7EB",
  },
  typography: {
    fontFamily:
      "'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.5rem", fontWeight: 700 },
    h3: { fontSize: "1.25rem", fontWeight: 600 },
    h4: { fontSize: "1.125rem", fontWeight: 600 },
    h5: { fontSize: "1rem", fontWeight: 600 },
    h6: { fontSize: "0.875rem", fontWeight: 600 },
    body1: { fontSize: "0.875rem" },
    body2: { fontSize: "0.75rem" },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    ...Array(19).fill("none"),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: "#bcbec0 transparent", // رنگ سازمانی secondary
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
