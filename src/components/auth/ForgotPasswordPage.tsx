import { useState } from "react";
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:3001/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      setSubmitted(true);
      setTimeout(() => navigate("/reset-password"), 1000);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body2" mb={2}>
          Enter your email to receive reset instructions.
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={handleEmailChange}
            error={!!email && !isEmailValid}
            helperText={
              !!email && !isEmailValid ? "Please enter a valid email." : ""
            }
          />
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={!isEmailValid}
          >
            Send Reset Link
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={submitted}
        autoHideDuration={4000}
        onClose={() => setSubmitted(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          If this email exists, a reset link was sent.
        </Alert>
      </Snackbar>
    </Container>
  );
}
