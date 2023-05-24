import * as React from 'react';
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
import SuccessSnackbar from 'components/SuccessSnackbar';
import { MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { CreateNewFolder } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import getAllUsers from 'api/getAllUsers';
import { useEffect } from 'react';
import { useState } from 'react';


const theme = createTheme();


export default function NewJob() {

  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [comp, setComp] = React.useState(false);
  const [dateTime, setDateTime] = React.useState(new Date('2014-08-18T21:11:54'));
  const [assignedTo, setAssignedTo] = React.useState('');
  const [users, setUsers] = useState([]);



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        const data = response.data
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);


  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  }
  const handleCompChange = (event) => {
    setComp(event.target.value);
  }
  const handleAssignedToChange = (event) => {
    setAssignedTo(event.target.value)
  }

  const handleSubmit = async (event) => {

    const API_URL = process.env.REACT_APP_BASE_URL

    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const email = data.get('email');
    // const password = data.get('password');
    // const fname = data.get('firstName');
    // const lname = data.get('lastName');
    // const role = "user"
    // const name = `${fname} ${lname}`;
    

    // CALL API HERE

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
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="jobNumber"
                  label="Job Number"
                  type="number"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="invoiceNumber"
                  label="Invoice Number"
                  name="invoiceNumber"
                  type="number"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
              <InputLabel id="comp">Comp?</InputLabel>
                <Select
                 value={comp}
                 label="Comp?"
                 onChange={handleCompChange}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="email"
                />
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
                <TextField
                  required
                  fullWidth
                  name="hoa"
                  label="HOA"
                  id="hoa"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="description"
                  id="Description"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lockBox"
                  label="Lock Box"
                  id="lockBox"
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="estNumber"
                  label="Est Number"
                  id="estNum"
                  inputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>$</InputAdornment>
                    )
                  }}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="estAmount"
                  label="Est Amount"
                  id="estAmount"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="custPO"
                  label="Cust PO/WO"
                  id="custPO"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="owner"
                  label="Owner"
                  id="owner"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  id="Description"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  id="Description"
                />
              </Grid>
              <Grid item xs={12}>
              <InputLabel id="comp">Assign To</InputLabel>
                <Select
                fullWidth
                 value={assignedTo}
                 label="Assign To"
                 onChange={handleAssignedToChange}
                >
                    {users.map((user) => (
                        <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
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
              Request Access
            </Button>
            <SuccessSnackbar showSnackbar={showSnackbar} handleSnackbarClose={handleSnackbarClose} message={"Request success you will be redirected in 5 seconds"}/>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
};