import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BsEyeSlash } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import { userLog } from '../../redux/user/user';
import { loginUser } from '../../redux/actions/auth';

const theme = createTheme();

export default function Confirmation() {
  const [seePassword, setSeePassword] = useState(false);

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    user, error, message, loading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userLog());
  }, []);

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

  if ((user && !user.confirmed_at)) {
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

            <Typography component="h1" variant="h5">
              Confirm Account
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
                    type={seePassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                  />
                  <span className="cursor-pointer absolute right-mid" onClick={() => setSeePassword((prev) => !prev)}>

                    {seePassword ? <BsEyeSlash /> : <AiOutlineEye />}
                  </span>
                </Grid>

              </Grid>
              <p className="text-blue">
                {' '}
                {loading && 'loading...'}
              </p>

              <p className="text-red-600">
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

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  navigation('/');
}
