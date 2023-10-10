import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '../components/Link.tsx';
import {SubmitHandler, useForm} from "react-hook-form";
import {ISignUp} from "../interfaces/ISignUp.ts";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import $api from "../http";
import {AuthResponse} from "../models/AuthResponse.ts";
import {FC, useState} from "react";
import {IUser} from "../models/IUser.ts";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

interface SignUpProps {
    onAuth: (state: boolean) => void
    onUser: (user: IUser) => void
}

const SignUp:FC<SignUpProps> = ({onAuth, onUser}) => {

    const [showPassword, setShowPassword] = React.useState(true);
    const [errorMessage, setErrorMessage] = useState<String | undefined>();


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        formState: {errors}

    } = useForm<ISignUp>()

    const registration = async (name: string, email: string, password: string) => {
        try {
            const response = await $api.post<AuthResponse>('/registration', {name, email, password});
            localStorage.setItem('token', response.data.refreshToken)
            onAuth(true)
            onUser(response.data.user)
        } catch (e: any) {
            setErrorMessage(e.response.data.message)
        }
    }

    const onSubmit: SubmitHandler<ISignUp> = async ({name, email, password}) => {
        await registration(name, email, password)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                required
                                fullWidth
                                id="Name"
                                label={errors.name?.message || 'Name'}
                                autoFocus
                                {...register('name', {
                                    required: 'Name is required',
                                    pattern: {
                                        value: /^[a-zA-Z][a-zA-Z0-9]{1,20}$/,
                                        message: '2-20 chars: Start with a letter, use letters and numbers'
                                    }
                                })}
                                error={!!errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label={errors.email?.message || 'Email'}
                                autoComplete="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                                        message: 'Please enter valid email'
                                    }
                                })}
                                error={!!errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel
                                    htmlFor="outlined-adornment-password"
                                    error={!!errors.password?.message}
                                >
                                    {errors.password?.message || 'Password *'}
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={!showPassword ? 'text' : 'password'}
                                    autoComplete='new-password'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={errors.password?.message || 'Password *'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                            message: 'Use mix case, numbers, symbols. At least 8 characters'
                                        }
                                    })}
                                    error={!!errors.password?.message}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color='error'>{errorMessage}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 5}}/>
        </Container>
    );
}

export default SignUp