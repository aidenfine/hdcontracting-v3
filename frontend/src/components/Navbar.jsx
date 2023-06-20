import React from 'react';
import { Menu as MenuIcon, SearchOutlined, SettingsOutlined } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { AppBar, Button, IconButton, TextField, Toolbar } from '@mui/material';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  function logout() {
    window.localStorage.clear();
    window.location.href = '/';
  }

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/*  LEFT SIDE OF PAGE  */}
        <FlexBetween flexGrow={1}>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween flexGrow={1} borderRadius="100px" gap="3rem" p="0.1rem 1.5rem"></FlexBetween>
        </FlexBetween>
        <Button variant="outlined" onClick={logout} color="error">
          Sign out
        </Button>
        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem"></FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
