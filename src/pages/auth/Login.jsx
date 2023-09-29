import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/auth';
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import './auth.css';
import { updater } from '../../redux/cart/cart';
import { userLog } from '../../redux/user/user';
import {BsFacebook} from "react-icons/bs"
import {FcGoogle} from "react-icons/fc"




// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { userLog } from '../../redux/auth/user_authentication';
// import { userSession } from '../../redux/actions/auth';
// import { Copyright } from './Copyright';

function Copyright(props) {

    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Vortech
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
const theme = createTheme();

export default function Login() {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const {user, error, message, loading} = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(userLog())
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formInput = {
      user: {
    email: data.get('email'),
    password: data.get('password'),
      }
  }
    dispatch(loginUser(formInput))

  };
  if (user == null || user == undefined){

 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <NavLink to={'/'}>Visit Site</NavLink>
         
          <Typography component="h1" variant="h5">
            Login 
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <p className="blue">
              {' '}
              {loading && 'loading...' }
            </p>

            <p className="red">
              {' '}
              {error && message }
            </p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/auth/sign_up">

                
                <Link variant="body2">
                  Do not have an account? Sign Up
                </Link>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}else{
  navigation("/")
}
}