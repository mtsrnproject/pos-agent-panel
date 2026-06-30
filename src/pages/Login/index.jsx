import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("نام کاربری و رمز عبور الزامی است");
      setLoading(false);
      return;
    }

    try {
      // برای development: اگر از credentials صحیح استفاده کنند
      // یا اگر تنها می‌خواهند test کنند می‌توانند هر چیزی وارد کنند
      if (username && password) {
        // سعی کن واقعی login کنی
        try {
          await authService.login(username, password);
          navigate("/dashboard");
        } catch (apiErr) {
          // اگر API کار نکرد، برای development موارد mock کن
          if (process.env.NODE_ENV === "development") {
            localStorage.setItem("user", JSON.stringify(username));
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("authToken", "mock-dev-token");
            navigate("/dashboard");
          } else {
            throw apiErr;
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("نام کاربری یا رمز عبور اشتباه است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 3, textAlign: "center", fontWeight: 600 }}
          >
            ورود به سیستم
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? "در حال ورود..." : "ورود"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
