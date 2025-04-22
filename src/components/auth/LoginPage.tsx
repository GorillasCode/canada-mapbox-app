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


const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleLogin = () => {
        if (email === 'admin@mapbox.com' && password === '123456') {
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/app');
            }, 1500);
        } else {
            setShowError(true);
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
                }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                <Box display="flex" flexDirection="column" gap={3}>
                    <TextField
                        label="E-mail"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Sign in
                    </Button>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ 
                                cursor: 'pointer', 
                                fontWeight: 500,
                                '&:hover': { textDecoration: 'underline'} }}
                            onClick={() => navigate('Register')} 
                        >
                            Don't have an account?
                        </Typography>
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ 
                                cursor: 'pointer', 
                                fontWeight: 500,
                                '&:hover': { textDecoration: 'underline'} }}
                            // onClick={() => navigate('')}
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" variant="filled">
                    Login successful.
                </Alert>
            </Snackbar>

            <Snackbar
                open={showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="error" variant="filled">
                    Invalid credentials. Please try again.
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default LoginPage;