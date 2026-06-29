import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("نام کاربری و رمز عبور الزامی است");
      return;
    }

    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/auth/login', { username, password })
      // localStorage.setItem('authToken', response.data.token)

      // Temporary mock
      localStorage.setItem("authToken", "mock-token");
      navigate("/dashboard");
    } catch (err) {
      setError("نام کاربری یا رمز عبور اشتباه است");
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
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button fullWidth type="submit" variant="contained" size="large">
              ورود
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
