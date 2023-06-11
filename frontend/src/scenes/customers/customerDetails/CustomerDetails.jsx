import * as React from 'react';
import { useParams } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';
import getCustomerById from 'api/getCustomerById';
import { Box, Button, Card, Grid, Paper } from '@mui/material';
import { card, customerData, customerDetailButtonBox } from './style'

export function CustomerDetails() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [customer, setCustomer] = React.useState(null);

  React.useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const data = await getCustomerById(id);
        setCustomer(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  if (loading) {
    return <SyncLoader color="#e42525" />;
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
              id: {customer.id}
            </Box>
            <Box sx={customerData}>
              Name: {customer.name}
            </Box>
            <Box sx={customerData}>
              Email: {customer.email}
            </Box>
            <Box sx={customerData}>
              Sub: {customer.subCustomers}
            </Box>
            <Box sx={customerData}>
              Notes: {customer.notes}
            </Box>
          </div>
          <Box sx={customerDetailButtonBox}>
            <Button variant="outlined" color="info">Edit Customer</Button>
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
