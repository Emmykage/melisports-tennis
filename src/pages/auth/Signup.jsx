import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

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

import { BsEyeSlash } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import { userLog } from '../../redux/user/user';
import { addUser } from '../../redux/actions/auth';

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

export default function SignUp() {
  const [seePassword, setSeePassword] = useState(false);

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    user, error, message, loading,
  } = useSelector((state) => state.user);

  const [notification, setNotification] = useState({ color: '', text: null });
  useEffect(() => {
    dispatch(userLog());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formInput = {
      user: {
        first_name: data.get('firstName'),
        last_name: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        phone_no: data.get('phone_no'),
        username: data.get('username'),
        role: 'client',

      },

    };
    dispatch(addUser(formInput)).then(result => {
      if(addUser.fulfilled.match(result)){
        navigation('/auth/confirmation');
      }
    });
  };
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

            <NavLink to="/" className="hover:text-blue-600 font-semibold ">
               <img  className='h-40 text-red-950' src='/logo192.png'/>
            </NavLink>

            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
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

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone_no"
                    label="Mobile"
                    name="phone_no"
                    autoComplete="phone_no"
                  />
                </Grid>

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
              <p className="text-blue">
                {' '}
                {loading && 'loading...' }
              </p>

              <p className="text-red-500">
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
