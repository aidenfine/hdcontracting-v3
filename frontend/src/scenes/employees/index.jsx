import { Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from 'state/isAuth';
import Loading from 'components/loadingPage/Loading';
import { isMobile } from 'react-device-detect';
import { CustomersMobile } from 'mobile/pages/CustomersMobile';
import getAllUsers from 'api/getAllUsers';
import EmployeesTable from 'components/employeesTable/EmployeesTable';

export const Employees = () => {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState([]);
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(token);
        const data = response.data;
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchUsers();
  }, [token]);

  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <Loading />;
  }

  if (isMobile) {
    return <CustomersMobile />;
  }
  return (
    <Grid item xs={3} sx={{ margin: '10px' }}>
      <Card>
        <CardContent>
          <EmployeesTable data={userData} />
        </CardContent>
      </Card>
    </Grid>
  );
};
