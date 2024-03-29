import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorSnackbar from 'components/ErrorSnackbar';
import SuccessSnackbar from 'components/SuccessSnackbar';
import { Navigate } from 'react-router-dom';
import InfoSnackbar from 'components/InfoSnackbar';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        HD-Contracting
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
export default function Login() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const [infoSnackbarOpen, setInfoSnackbarOpen] = React.useState(false);
  const [infoSnackbarMessage, setInfoSnackbarMessage] = React.useState('');

  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
  const [successSnackbarMessage, setSuccessSnackbarMessage] = React.useState('');

  // simple redirect if user is logged in but ends back onto login page
  React.useEffect(() => {
    if (window.localStorage.isLoggedIn === 'true') {
      setInfoSnackbarOpen(true);
      setInfoSnackbarMessage('Please sign out before doing that');
    }
  }, []);

  const API_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          console.log(data.data);
          setSuccessSnackbarOpen(true);
          setSuccessSnackbarMessage('Success!');
          window.localStorage.setItem('token', data.data);
          window.localStorage.setItem('isLoggedIn', true);
          window.location.href = '/dashboard';
        } else {
          setSnackbarOpen(true);
          setSnackbarMessage(`Error: ${data.error}`);
        }
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
  };

  const handleInfoSnackbarClose = () => {
    setInfoSnackbarOpen(false);
  };

  if (window.localStorage.isLoggedIn === 'true') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="request-access" variant="body2">
                    {'Need an account? Request Access'}
                  </Link>
                </Grid>
                <ErrorSnackbar
                  showSnackbar={snackbarOpen}
                  handleSnackbarClose={handleSnackbarClose}
                  message={snackbarMessage}
                />
                <SuccessSnackbar
                  showSnackbar={successSnackbarOpen}
                  handleSnackbarClose={handleSuccessSnackbarClose}
                  message={successSnackbarMessage}
                />
                <InfoSnackbar
                  showSnackbar={infoSnackbarOpen}
                  handleSnackbarClose={handleInfoSnackbarClose}
                  message={infoSnackbarMessage}
                />
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
