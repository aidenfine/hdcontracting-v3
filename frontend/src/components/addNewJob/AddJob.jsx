import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SuccessSnackbar from 'components/SuccessSnackbar';
import { MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { CreateNewFolder } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import getAllUsers from 'api/getAllUsers';
import { useEffect } from 'react';
import { useState } from 'react';
import ErrorSnackbar from 'components/ErrorSnackbar';

const theme = createTheme();

export default function NewJob() {
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_BASE_URL;

  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [comp, setComp] = React.useState(false);
  // const [dateTime, setDateTime] = React.useState(new Date('2014-08-18T21:11:54'));
  const [assignedTo, setAssignedTo] = React.useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(token);
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [token]);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };
  const handleCompChange = (event) => {
    setComp(event.target.value);
  };
  const handleAssignedToChange = (event) => {
    const {
      target: { value },
    } = event;
    setAssignedTo(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSubmit = async (event) => {
    const token = localStorage.getItem('token');
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!form.checkValidity()) {
      setShowSnackbar(true);
      return;
    }

    const jobData = {
      jobNumber: formData.get('jobNumber'),
      phone: formData.get('phone'),
      owner: formData.get('owner'),
      lockBox: formData.get('lockBox'),
      invoiceNumber: formData.get('invoiceNumber'),
      hoa: formData.get('hoa'),
      estAmount: formData.get('estAmount'),
      estNumber: formData.get('estNumber'),
      email: formData.get('email'),
      description: formData.get('description'),
      custPO: formData.get('custPO'),
      comp: formData.get('comp') === 'true',
      city: formData.get('city'),
      assignedTo: assignedTo,
      address: {
        city: formData.get('city'),
        street: formData.get('street'),
      },
    };
    console.log(assignedTo);

    try {
      const response = await fetch(`${API_URL}/api/jobs/addJob`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Optional: Handle the API response
        // Reset the form if needed
        form.reset();
      } else {
        console.error('Request failed with status:', response.status);
        // Handle the error
      }
    } catch (error) {
      console.error(error);
    }

    console.log(formData);
    // API CALL
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
            <CreateNewFolder />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Job
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="jobNumber"
                  required
                  fullWidth
                  id="jobNumber"
                  label="Job Number"
                  type="number"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="invoiceNumber"
                  label="Invoice Number"
                  name="invoiceNumber"
                  type="number"
                />
              </Grid>
              {/* TO DO REMOVE THIS COMP THIS SHOULD DEFAULT TO FALSE*/}
              <Grid item xs={12}>
                <InputLabel id="comp">Comp?</InputLabel>
                <Select
                  fullWidth
                  value={comp}
                  required
                  name="comp"
                  label="Comp?"
                  onChange={handleCompChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth id="street" label="Street" name="street" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth name="hoa" label="HOA" id="hoa" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="description" label="description" id="Description" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="lockBox" label="Lock Box" id="lockBox" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="estNumber" label="Est Number" id="estNum" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="estAmount"
                  label="Est Amount"
                  id="estAmount"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="custPO" label="Cust PO/WO" id="custPO" type="number" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="owner" label="Owner" id="owner" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="phone" label="Phone Number" id="Description" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="email" label="Email" id="email" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="comp">Assign To</InputLabel>
                <Select
                  fullWidth
                  multiple
                  value={assignedTo}
                  label="Assign To"
                  name="assignedTo"
                  onChange={handleAssignedToChange}
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Add Jobs
            </Button>
            <SuccessSnackbar
              showSnackbar={showSnackbar}
              handleSnackbarClose={handleSnackbarClose}
              message={'You have Added a job'}
            />
          </Box>
        </Box>
        <ErrorSnackbar
          message="Please fill out required Items"
          showSnackbar={showSnackbar}
          handleSnackbarClose={handleSnackbarClose}
        />
      </Container>
    </ThemeProvider>
  );
}
