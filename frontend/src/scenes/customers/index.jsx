import { Button, Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from 'state/isAuth';
import CustomersTable from 'components/customersTable/CustomersTable';

function addNewCustomerBtn() {
  window.location.href = '/customers/addNewCustomer';
}

export const Customers = () => {
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }
  return (
    <Grid item xs={3} sx={{ margin: '10px' }}>
      <Card>
        <CardContent>
          <Button variant="outlined" onClick={addNewCustomerBtn}>
            Add Customer
          </Button>
          <CustomersTable />
        </CardContent>
      </Card>
    </Grid>
  );
};
