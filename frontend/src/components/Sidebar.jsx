import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import { CalendarTodayOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined, ReceiptOutlined, WorkOutlineOutlined } from '@mui/icons-material';

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined color='#212121'/>
    },
    {
        text: "Client",
        icon: null,
    },
    {
        text: "Jobs",
        icon: <WorkOutlineOutlined />
    },
    {
        text: "Invoices",
        icon: <ReceiptOutlined />
    },
    {
        text: "Calendar",
        icon: <CalendarTodayOutlined />
    },
]
const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=> {
        setActive(pathname.substring(1));
    }, [pathname])
    const theme = useTheme();

    return <Box component="nav">
        {isSidebarOpen && (
            <Drawer
            open={isSidebarOpen}
            onClose={()=> setIsSidebarOpen(false)}
            variant='presistent'
            anchor='left'
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper":{
                    color: "#A2ABB5",
                    backgroundColor: "FFFFFF",
                    boxSizing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth
                }
            }}
            >
                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween> {/* ADD COLOR TO THIS LATER  */}
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                <Typography variant='h6' color="black" fontWeight="bold">
                                    HD-Contracting
                                </Typography>
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>
                    <List>
                        {navItems.map(({ text, icon }) =>{
                            if (!icon){
                                return (
                                    <Typography key={text} sx={{ m: "2.5rem 0 1rem 3rem" }}>
                                        {text}
                                    </Typography>
                                );
                            }
                            const lowerCaseText = text.toLowerCase();
                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton onClick={()=> { navigate(`/${lowerCaseText}`);
                                    setActive(lowerCaseText);}}
                                    sx={{
                                        backgroundColor: active === lowerCaseText ? theme.palette.secondary[300] : "transparent",
                                        color: active === lowerCaseText ? theme.palette.primary[600] : theme.palette.secondary[100]
                                    }}
                                    >
                                        <ListItemIcon
                                        sx={{
                                            ml: "2rem",
                                            color: active === lowerCaseText ? theme.palette.primary[600] : theme.palette.secondary[200]
                                        }}
                                        >
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                        {active === lowerCaseText && (
                                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}

                    </List>
                </Box>
            </Drawer>
        )}

    </Box>
    }



export default Sidebar;