// src/pages/NotFound/index.jsx
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "8rem", fontWeight: "bold", color: "#1976d2" }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        صفحه مورد نظر یافت نشد
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.
      </Typography>
      <Button
        variant="contained"
        startIcon={<Home />}
        onClick={() => navigate("/dashboard")}
      >
        بازگشت به داشبورد
      </Button>
    </Box>
  );
};

export default NotFound;
