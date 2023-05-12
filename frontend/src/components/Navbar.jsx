import React from "react";
import {
  Menu as MenuIcon,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import {
  AppBar,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";

const Navbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
})=>{

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/*  LEFT SIDE OF PAGE  */}
        <FlexBetween flexGrow={1}>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            flexGrow={1}
            borderRadius="100px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <TextField 
            variant="outlined" 
            background="#FFFFFFF"
            sx={{backgroundColor:"white", boxShadow: 2, borderRadius: "10px", "& fieldset": { border: 'none'}}}
            fullWidth 
             placeholder="Search..."
             InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              ),
              endAdornment:(
              <IconButton>
                <SettingsOutlined sx={{ fontSize: "25px" }} />
              </IconButton>
              )
             }}
             />
          </FlexBetween>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
