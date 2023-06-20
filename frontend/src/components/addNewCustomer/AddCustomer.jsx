import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SuccessSnackbar from 'components/SuccessSnackbar';
import { PersonAdd } from '@mui/icons-material';
import ErrorSnackbar from 'components/ErrorSnackbar';

const theme = createTheme();

export default function AddCustomer() {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = React.useState(false);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = async (event) => {
    const API_URL = process.env.REACT_APP_BASE_URL;

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const fname = data.get('firstName');
    const lname = data.get('lastName');
    const name = `${fname} ${lname}`;
    const street = data.get('street');
    const city = data.get('city');
    const notes = data.get('notes');

    try {
      const response = await fetch(`${API_URL}/api/customers/addCustomer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          street,
          city,
          notes,
          address: {
            city,
            street,
          },
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setShowSnackbar(true);
      } else {
        // handle error case
        console.error('Request failed:', responseData);
        setShowErrorSnackbar(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Customer
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  //   autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  //   autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth id="notes" label="Notes" name="notes" multiline rows={3} />
              </Grid>
              {/* 
              
              TODO ADD THE DROP DOWN AND API CALL TO GET THE 
              CUSTOMERS AND DEFAULT THE DROPDOWN TO NONE

              */}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Add Customer
            </Button>
            <SuccessSnackbar
              showSnackbar={showSnackbar}
              handleSnackbarClose={handleSnackbarClose}
              message={'Customer Added'}
            />
            <ErrorSnackbar
              message="Please fill out required Items"
              showSnackbar={showErrorSnackbar}
              handleSnackbarClose={handleSnackbarClose}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/customers" variant="body2">
                  View Table
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
