import {
  CalendarTodayOutlined,
  ContactPageOutlined,
  HowToRegOutlined,
  PeopleAltOutlined,
  ReceiptOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { Box, Grid, Paper, styled } from '@mui/material';
import Header from 'components/Header';
import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from 'state/isAuth';
import { iconBox } from './style';

export const Dashboard = () => {
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#FFFFF' : '#FFFFF', // background color
    ...theme.typography.body2,
    padding: theme.spacing(2),

    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <Box sx={{ margin: '30px' }}>
      <Header title={'Welcome User'} />
      <Grid container spacing={2} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <h3>Jobs</h3>
            <Box sx={iconBox}>
              <WorkOutlineOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h3>Calendar</h3>
            <Box sx={iconBox}>
              <CalendarTodayOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h3>Invoices</h3>
            <Box sx={iconBox}>
              <ReceiptOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h3>Customers</h3>
            <Box sx={iconBox}>
              <ContactPageOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h3>Employees</h3>
            <Box sx={iconBox}>
              <PeopleAltOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h3>Dashboard Users</h3>
            <Box sx={iconBox}>
              <HowToRegOutlined />
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
