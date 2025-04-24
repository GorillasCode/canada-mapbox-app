import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetToken || !password || !confirmPassword) {
      setSnackbar({
        open: true,
        type: "error",
        message: "All fields are required."
      });
      return;
    }

    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Passwords do not match."
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL_BASE}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: resetToken,
            newPassword: password,
            confirmPassword: confirmPassword
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSnackbar({
          open: true,
          type: "success",
          message: "Password updated successfully!"
        });
        setTimeout(() => navigate("/"), 1000);
      } else {
        setSnackbar({
          open: true,
          type: "error",
          message: data?.error || "Reset failed."
        });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        type: "error",
        message: "Network error. Try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Paper elevation={6} sx={{ padding: 5, borderRadius: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            🔒 Reset Your Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Reset Token"
                variant="outlined"
                fullWidth
                value={resetToken}
                onChange={e => setResetToken(e.target.value)}
              />

              <TextField
                label="New Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(prev => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm(prev => !prev)}
                        edge="end"
                      >
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  backgroundColor: "#b71c1c",
                  fontWeight: "bold",
                  textTransform: "none"
                }}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.type} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResetPasswordPage;
