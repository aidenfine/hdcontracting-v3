import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, Grid, Paper, TextField } from '@mui/material';
import { card, customerData, customerDetailButtonBox } from './style';
import { getCustomerById } from '../../../api/getCustomerById';
import { updateCustomer } from 'api/updateCustomer';
import Loading from 'components/loadingPage/Loading';
// Import the getCustomerById and updateCustomer API functions

export function CustomerDetails() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [customer, setCustomer] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState('');
  const [editedEmail, setEditedEmail] = React.useState('');
  const [editedNotes, setEditedNotes] = React.useState('');

  React.useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const data = await getCustomerById(id);
        setCustomer(data);
        setLoading(false);
        // Initialize the editable fields with current customer data
        setEditedName(data.name);
        setEditedEmail(data.email);
        setEditedNotes(data.notes);
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const handleEditCustomer = async () => {
    if (isEditing) {
      // Prepare the updated customer data object
      const updatedCustomerData = {
        name: editedName,
        email: editedEmail,
        notes: editedNotes,
      };

      try {
        // Call the updateCustomer API function to update the customer
        console.log(id);
        console.log(typeof updateCustomer);
        await updateCustomer(id, updatedCustomerData);
        console.log('Customer updated successfully');
        setIsEditing(false); // Exit editing mode
      } catch (error) {
        console.error('Error updating customer:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEditedEmail(event.target.value);
  };

  const handleNotesChange = (event) => {
    setEditedNotes(event.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (!customer) {
    return <div>Error! Customer not found.</div>;
  }

  return (
    <>
      <h2>Customer: {customer.name}</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={12}>
            <Card sx={card}>
              <h3>Customer Details</h3>
              <div>
                <Box sx={customerData}>
                  {isEditing ? (
                    <TextField
                      label="Name"
                      variant="outlined"
                      value={editedName}
                      onChange={handleNameChange}
                    />
                  ) : (
                    `Name: ${customer.name}`
                  )}
                </Box>
                <Box sx={customerData}>
                  {isEditing ? (
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={editedEmail}
                      onChange={handleEmailChange}
                    />
                  ) : (
                    `Email: ${customer.email}`
                  )}
                </Box>
                <Box sx={customerData}>Sub: {customer.subCustomers}</Box>
                <Box sx={customerData}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Notes"
                      variant="outlined"
                      value={editedNotes}
                      onChange={handleNotesChange}
                    />
                  ) : (
                    `Notes: ${customer.notes}`
                  )}
                </Box>
              </div>
              <Box sx={customerDetailButtonBox}>
                <Button variant="outlined" color="info" onClick={handleEditCustomer}>
                  {isEditing ? 'Save Changes' : 'Edit Customer'}
                </Button>
              </Box>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={12}>
            <Card sx={card}>
              <h3>Add Sub Customer</h3>
              Need to add form or something
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
