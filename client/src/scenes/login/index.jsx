import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookies] = useCookies();
    const [token, setToken] = useCookies();
    const { setAuth, auth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state ? location.state.from : { pathname: "/" };

    let handleSubmit = async (e) => {
        e.preventDefault();
        var userData = {
            password: password,
            email: email,
        };
        // console.log(userData);

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/admin/login`,
            data: userData,
        }).then((response) => {
            console.log(response.data);
            // console.log(response.data.token);
            const accessToken = response.data.token;
            const userId = response.data.user_id
            // setAuth({ email, accessToken, userId });
            setCookies("user", userId, { path: '/', maxAge: 3600 })
            setToken("token", accessToken, { path: '/', maxAge: 3600 })
            console.log(accessToken);
            accessToken ? navigate(from, { replace: true }) : alert(response.data.message);
            // navigate(from, { replace: true });
        });
    };

    return (
        <Container component="main">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
