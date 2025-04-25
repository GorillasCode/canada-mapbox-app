import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Snackbar,
    TextField,
    Typography,
    Alert,
    Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const Header = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
}));

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError(true);
            setEmailHelperText('Enter a valid email address');
            return false;
        } else {
            setEmailError(false);
            setEmailHelperText('');
            return true;
        }
    };

    const handleRegister = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordMatch = password === confirmPassword;

        if (!isPasswordMatch) {
            setConfirmPasswordError(true);
            setConfirmPasswordHelperText('Passwords do not match');
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordHelperText('');
        }

        if (!name || !email || !isEmailValid || !isPasswordMatch) {
            setShowError(true);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL_BASE}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: name,
                    username: email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const backendMessage = data?.error;

                if (backendMessage === "Conflict.") {
                    setEmailError(true);
                    setEmailHelperText("Email is already registered.");
                } else if (typeof backendMessage === "object") {
                    setEmailError(true);
                    setEmailHelperText("Invalid fields.");
                } else {
                    setEmailHelperText(backendMessage || "Registration failed.");
                }

                setShowError(true);
                return;
            }

            localStorage.setItem("token", data.accessToken);
            setShowSuccess(true);

            setTimeout(() => {
                navigate("/lnpm start");
            }, 1500);
        } catch (error) {
            console.error(error);
            setShowError(true);
            setEmailHelperText("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <Container maxWidth="sm">
            <Header>
                <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                    🦷 Dental Market Explorer 🍁
                </Typography>
            </Header>

            <Paper
                elevation={6}
                sx={{
                    padding: 5,
                    borderRadius: 4,
                    backgroundColor: '#ffffffdd',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Create Account
                </Typography>

                <Box display="flex" flexDirection="column" gap={3}>
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="E-mail"
                        variant="outlined"
                        fullWidth
                        value={email || ''}
                        error={emailError}
                        helperText={emailHelperText}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => {
                            const newPassword = e.target.value;
                            setPassword(newPassword);
                            if (confirmPassword !== newPassword) {
                                setConfirmPasswordError(true);
                                setConfirmPasswordHelperText('');
                            } else {
                                setConfirmPasswordError(false);
                                setConfirmPasswordHelperText('');
                            }
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (password !== e.target.value) {
                                setConfirmPasswordError(true);
                                setConfirmPasswordHelperText('Passwords do not match');
                            } else {
                                setConfirmPasswordError(false);
                                setConfirmPasswordHelperText('');
                            }
                        }}
                        error={confirmPasswordError}
                        helperText={confirmPasswordHelperText}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleRegister}
                        disabled={loading}
                        sx={{
                            borderRadius: 2,
                            padding: 1.5,
                            background: 'linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            letterSpacing: 1,
                            '&:hover': {
                                background: 'linear-gradient(45deg, #9a0007 30%, #c62828 90%)',
                            },
                        }}
                    >
                        {loading ? 'Registering...' : 'Sign up'}
                    </Button>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#b71c1c',
                                cursor: 'pointer',
                                fontWeight: 500,
                                '&:hover': { textDecoration: 'underline', color: '#9a0007' },
                            }}
                            onClick={() => navigate('/')}
                        >
                            Already have an account? Sign in
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Snackbar
                open={showSuccess}
                autoHideDuration={2000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" variant="filled">
                    Registration successful. Redirecting to login...
                </Alert>
            </Snackbar>

            <Snackbar
                open={showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="error" variant="filled">
                    Something went wrong. Please check your information and try again.
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RegisterPage;