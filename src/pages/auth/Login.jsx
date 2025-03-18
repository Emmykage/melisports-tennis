import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import './auth.css';
import { BsEyeSlash, BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
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
import { userLog } from '../../redux/user/user';
import { updater } from '../../redux/cart/cart';
import { loginUser } from '../../redux/actions/auth';

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

export default function Login() {
  const [seePassword, setSeePassword] = useState(false);
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    user, error, message, loading, logged,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userLog());
  }, [user]);

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
  if (!logged) {
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
            <NavLink to="/" className="hover:text-blue-600 font-semibold ">Visit Site</NavLink>

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
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
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
  }
  navigation(location.state?.from || '/store');
}
