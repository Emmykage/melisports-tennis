import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  Link, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography, createTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { BsEyeSlash } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import { addUser } from '../../redux/actions/auth';
import { userLog } from '../../redux/user/user';

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

const AdminSignUp = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [show, setShow] = useState(true);

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    user, error, message, loading,
  } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formInput = {
      user: {
        first_name: data.get('firstName'),
        last_name: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        // phone_no: data.get('phone_no'),
        username: data.get('username'),
        role: 'admin',

      },

    };
    dispatch(addUser(formInput));
  };
  useEffect(() => {
    dispatch(userLog());
  }, []);

  const toggleReveal = () => {
    setShow((prev) => !prev);
  };
  if (user == null || user == undefined) {
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

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                {/* <div className='relative'> */}

                <Grid className="relative" item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />

                </Grid>
                {/* </div> */}

                <Grid item xs={12}>
                  <TextField

                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
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
                {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone_no"
                  label="Mobile"
                  name="phone_no"
                  autoComplete="phone_no"
                />
              </Grid> */}

                <Grid className="relative" item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={seePassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                  />
                  <span className="cursor-pointer absolute right-mid" onClick={() => setSeePassword((prev) => !seePassword)}>

                    {seePassword ? <BsEyeSlash /> : <AiOutlineEye />}
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/auth/login">
                    <Link variant="body2">
                      Already have an account? Sign in
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
  }

  navigation('/auth/confirmation');
};

export default AdminSignUp;
