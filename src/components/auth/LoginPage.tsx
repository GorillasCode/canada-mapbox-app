import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
  Alert,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const Header = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(4)
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL_BASE}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: email, password })
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/app");
      }, 1500);
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Header>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          🦷 Dental Market Explorer 🍁
        </Typography>
      </Header>

      <Paper
        elevation={6}
        sx={{
          padding: 5,
          borderRadius: 4,
          backgroundColor: "#ffffffdd",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleLogin}
            sx={{
              borderRadius: 2,
              padding: 1.5,
              background: "linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              letterSpacing: 1,
              "&:hover": {
                background: "linear-gradient(45deg, #9a0007 30%, #c62828 90%)"
              }
            }}
          >
            Sign in
          </Button>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                color: "#b71c1c",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { textDecoration: "underline", color: "#9a007" }
              }}
              onClick={() => navigate("Register")}
            >
              Don't have an account?
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                color: "#b71c1c",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { textDecoration: "underline", color: "#9a0007" }
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Login successful.
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          Invalid credentials. Please try again.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
