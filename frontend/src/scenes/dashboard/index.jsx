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
import { Navigate, useNavigate } from 'react-router-dom';
import isAuth from 'state/isAuth';
import { iconBox } from './style';
// import getUserData from 'api/getUserData';
// import { useState } from 'react';
// import { useEffect } from 'react';

export const Dashboard = () => {
  // useEffect(() => {
  //   getDataForPendo()

  // },[])

  // const [user, setUser] = useState([])
  const navigate = useNavigate();
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }

  // async function getDataForPendo(){
  //   const API_URL = process.env.REACT_APP_BASE_URL;
  //   const token = window.localStorage.getItem('token');

  //   const data = await getUserData(token);
  //   setUser(data)
  // }

  // console.log(user);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#FFFFF' : '#FFFFF', // background color
    ...theme.typography.body2,
    padding: theme.spacing(2),

    textAlign: 'center',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F5F5F9',
    },
  }));

  const handleGridItemClick = (event) => {
    const title = event.currentTarget.getAttribute('data-title');
    navigate(`/${title}`, {
      replace: false,
    });
  };

  return (
    <Box sx={{ margin: '30px' }}>
      <Header title={'Welcome Aiden!'} />
      <Grid container spacing={2} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item onClick={handleGridItemClick} data-title="Jobs">
            <h3>Jobs</h3>
            <Box sx={iconBox}>
              <WorkOutlineOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item onClick={handleGridItemClick} data-title="Calendar">
            <h3>Calendar</h3>
            <Box sx={iconBox}>
              <CalendarTodayOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item onClick={handleGridItemClick} data-title="Invoices">
            <h3>Invoices</h3>
            <Box sx={iconBox}>
              <ReceiptOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item onClick={handleGridItemClick} data-title="Customers">
            <h3>Customers</h3>
            <Box sx={iconBox}>
              <ContactPageOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item onClick={handleGridItemClick} data-title="Employees">
            <h3>Employees</h3>
            <Box sx={iconBox}>
              <PeopleAltOutlined />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item onClick={handleGridItemClick} data-title="Dashboard Users">
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
