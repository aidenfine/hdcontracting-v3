import { Button, Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from 'state/isAuth';
import CustomersTable from 'components/customersTable/CustomersTable';
import getAllCustomers from 'api/getAllCustomers';
import Loading from 'components/loadingPage/Loading';

function addNewCustomerBtn() {
  window.location.href = '/customers/addNewCustomer';
}

export const Customers = () => {
  const [loading, setLoading] = React.useState(true);
  const [customerData, setCustomerData] = React.useState([]);
  React.useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomers();
        const data = response.data;
        setCustomerData(data);
        setLoading(false);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchCustomers();
  }, []);

  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <Grid item xs={3} sx={{ margin: '10px' }}>
      <Card>
        <CardContent>
          <Button variant="outlined" onClick={addNewCustomerBtn}>
            Add Customer
          </Button>
          <CustomersTable data={customerData} />
        </CardContent>
      </Card>
    </Grid>
  );
};
