import { makeStyles, AppBar, Toolbar, Typography, ListItemText, IconButton, Drawer, Divider, ListItemIcon, List, Box, ListItem, CssBaseline } from "@material-ui/core";
import { styled, useTheme } from '@mui/material/styles';
import { Menu, ChevronLeft } from "@material-ui/icons";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";  // this is used for adding classes dynamically & multiple classes

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// components
import SearchBar from "./SearchBar";
import NavButtons from "./NavButtons";
import DrawerContext from "../context/drawer/DrawerContext";

const drawerWidth = 225;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const useStyle = makeStyles((theme) => ({
    appBar: { // this style adds smoothness in closing the drawer 
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: { // this style adds shifts the navbar to right with transition
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menu: {
        // margin: "2px 20px",
        color: "white"
    },
    menuOnclick: {
        display: "none",
    },
    logo: {
        color: "white",
        fontSize: "25px",
        marginRight: "auto",
    },
    drawer: {
        width: drawerWidth,
    },
    list: {
        position: "relative",
        width: 240,
        display: "block"
    },
}));

const Navbar = () => {
    const theme = useTheme();
    const classes = useStyle();

    const context = useContext(DrawerContext);  // for drawer opening and closing
    const {open, setOpen} = context;

    const handleDrawerOpen = () => {
        setOpen(true);
    }
    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <Box>
            <CssBaseline /> {/* for reset the css */}
            <AppBar position="fixed"
                className={classNames(classes.appBar, { [classes.appBarShift]: open })}>
                <Toolbar >
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menu, { [classes.menuOnclick]: open })}
                        edge="start"
                    >
                        <Menu />
                    </IconButton>

                    <Link to="/" style={{ textDecoration: "none" }} >
                        <Typography
                            className={classes.logo}
                            noWrap
                        >iNotebook
                        </Typography>
                    </Link>

                    <SearchBar />
                    <NavButtons />
                </Toolbar>
            </AppBar>
            {/* this below drawer opens after clicking the <Menu/> */}
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                variant="persistent"
                anchor="left"
            >
                <DrawerHeader> {/* from material ui */}
                    <Typography style={{ marginRight: "56px" }}>Login</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List
                    className={classes.drawer}>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>

    )
}

export default Navbar;



// const list = () => (
    //     <Box className={classes.list}>
    //         <List>
    //             <div className={classes.drawerHeader}>
    //                 <Typography style={{ display: "inline" }} variant="h4">Profile</Typography>
    //                 <IconButton  onClose={handleDrawerClose}><ChevronLeft /> </IconButton>
    //             </div>
    //             <ListItem button>
    //                 Home
    //             </ListItem>
    //             <ListItem button>
    //                 About
    //             </ListItem>
    //         </List>
    //     </Box>
    // )