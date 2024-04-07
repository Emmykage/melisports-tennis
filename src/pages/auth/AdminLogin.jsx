import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/auth';

import './auth.css';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { BsEyeSlash, BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { userLog } from '../../redux/user/user';
import { ThemeProvider } from 'styled-components';
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography, createTheme } from '@mui/material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Vortech
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}
const theme = createTheme();
const AdminLogin = () => {
  const [seePassword, setSeePassword] = useState(false)

  const [show, setShow] = useState(true);



  // const toggleReveal = () => {
  //   setShow((prev) => !prev);
  // };

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    user, error, message, loading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userLog());
  }, []);

  const handleRedirect = () => {
    localStorage.setItem('meli_auth', '');
    dispatch(userLog());
    navigate('/auth/login');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formInput = {
      user: {
        email: data.get('email'),
        password: data.get('password'),
      },
    };
    dispatch(loginUser(formInput));
  };
  if (user == null || user == undefined || Object.keys(user) == 0) {
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
            <NavLink to="/">Visit Site</NavLink>

            <Typography component="h1" variant="h5">
             Admin Login
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
                <Grid className='relative' item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={seePassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                />
                 <span className='cursor-pointer absolute right-mid' onClick={()=> setSeePassword(prev => !prev)}>
                
                {seePassword ?  <BsEyeSlash />  : <AiOutlineEye />}
                </span>
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
                Admin 
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
  } if (user.role == 'client') {
    return (
      <div>
        <h1 className='text-center'>
          You are not Authorized Please sign in
          <NavLink onClick={handleRedirect} className={'block text-center'} to="/auth/login">here</NavLink>
        </h1>

      </div>
    );
  }else{
    navigation('/admin');

  }

};

export default AdminLogin;
// else if( user.user.role == "client"){
//   return(
//     <div>
//       <h1>You are not Authorized Please sign in <NavLink to="/auth/login">here</NavLink> </h1>

//     </div>
//   )

// }

// || Object.keys(user == 0)
