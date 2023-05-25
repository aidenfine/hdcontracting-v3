import React, { useState, useEffect } from 'react';
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
import { InputLabel, MenuItem, Select } from '@mui/material';
import getAllCustomers from 'api/getAllCustomers';
import { addCustomer } from 'api/addCustomer';

const theme = createTheme();

export default function AddCustomer() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedSubCustomers, setSelectedSubCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomers();
        const data = response.data;
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, []);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleErrorSnackbarClose = () => {
    setShowErrorSnackbar(false);
  };

  const handleSubCustomerChange = (event) => {
    const { value } = event.target;
    setSelectedSubCustomers(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const name = `${firstName} ${lastName}`;
    const street = data.get('street');
    const city = data.get('city');
    const notes = data.get('notes');
  
    try {
      const selectedParentCustomerId = selectedSubCustomers[0];
      const parentCustomer = customers.find((customer) => customer._id === selectedParentCustomerId);
      if (!parentCustomer) {
        console.error('Parent customer not found');
        return;
      }
  
      const response = await addCustomer({
        name,
        email,
        street,
        city,
        notes,
        subCustomers: [],
        parent: parentCustomer._id, // Set the parent customer ID
      });
  
      if (response.ok) {
        setShowSnackbar(true);
      } else {
        setShowErrorSnackbar(true);
        setSnackbarMessage(`Error: ${response.error}`);
        console.error('Request failed:', response);
      }
    } catch (error) {
      setShowErrorSnackbar(true);
      setSnackbarMessage('An error occurred');
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
                <TextField fullWidth id="street" label="Street" name="street" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth id="city" label="City" name="city" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="notes"
                  label="Notes"
                  name="notes"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="subCustomers">Sub Customers</InputLabel>
                <Select
                  fullWidth
                  multiple
                  value={selectedSubCustomers}
                  label="Sub Customers"
                  name="selectedSubCustomers"
                  onChange={handleSubCustomerChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {customers.map((customer) => (
                    <MenuItem key={customer._id} value={customer._id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Customer
            </Button>
            <SuccessSnackbar
              showSnackbar={showSnackbar}
              handleSnackbarClose={handleSnackbarClose}
              message="Customer Added"
            />
            <ErrorSnackbar
              showSnackbar={showErrorSnackbar}
              handleSnackbarClose={handleErrorSnackbarClose}
              message={snackbarMessage}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/customers" variant="body2">
                  Click Here to go back to table
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
