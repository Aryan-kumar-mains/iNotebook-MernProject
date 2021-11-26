import { Box, Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';

// component
import DialogContext from "../context/dialogBox/DialogContext";
import CreateNote from "./CreateNote";
import SignUpContext from "../context/user/SignUpContext";

const useStyle = makeStyles((theme) => ({
    buttons: {
        textDecoration: "none",
        color: "white",
        marginLeft: "25px",
    },
    create: {
        color: "#3f51b5",
        borderRadius: "30px",
    },
    user: {
        marginLeft: 20,
        color: "#fff",
    },
    menu: {
        margin: "47px 5px 0 0"
    }
}));

const NavButtons = () => {
    const classes = useStyle();
    const history = useHistory();

    const [isMousedOver, setMouseOver] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [anchor, setAnchor] = useState(null); // it's used to set the position of 'Menu' on click
    const { open, setOpen, setText, setBtnText } = useContext(DialogContext);
    const { userData, logOut } = useContext(SignUpContext); // getting user info from local storage using context

    const loginOnMouseOut = {
        backgroundColor: "inherit",
        borderColor: "white",
    }
    const loginOnMouseOver = {
        backgroundColor: "white",
        color: "#3f51b5",
        borderColor: "white",
    }
    function openDialog() {   // this dialog for creating note
        setOpen(!open);
        setText("Create Your Note");
        setBtnText("Create");
    }
    const logOutHandler = () => {
        logOut();
        setOpenMenu(false);
    }
    const handleUser = (event) => {
        setOpenMenu(!openMenu);
        setAnchor(event.currentTarget);
    }
    const profileVisit = () => {
        history.push("/user/profile");
        setOpenMenu(false);
    }
    return (
        <Box>
            <Button className={classes.create} onClick={openDialog} variant="contained">Create Note</Button>
            {userData?.user ?
                <>
                    {/* If user is already loggedIn(it means user data is in localHost) */}
                    <Button className={classes.user} onClick={handleUser}>{userData.user.name}
                        <ArrowDropDownIcon />
                    </Button>
                    <Menu
                        className={classes.menu}
                        open={openMenu}
                        anchorEl={anchor}
                        // elevation={0} // it cancel the shadow of menu
                        onClose={() => setOpenMenu(!openMenu)}>
                        <MenuItem onClick={profileVisit}>
                            <PersonIcon />&nbsp;
                            My Profile
                        </MenuItem>
                        <MenuItem onClick={logOutHandler}>
                            <LogoutIcon />&nbsp;
                            Logout
                        </MenuItem>
                    </Menu>
                </>
                :
                <>  {/* If user is not loggedIn*/}
                    <Link to="/user/signup" className={classes.buttons}>
                        <Button variant="contained">Sign Up</Button>
                    </Link>
                    <Link to="/user/login" className={classes.buttons}>
                        <Button
                            style={isMousedOver ? loginOnMouseOver : loginOnMouseOut}
                            onMouseOver={() => setMouseOver(true)}
                            onMouseOut={() => setMouseOver(false)}
                            variant="outlined"
                        >
                            Login
                        </Button>
                    </Link>
                </>
            }
            <CreateNote />  {/* this is a dialog box*/}
        </Box>
    )
}

export default NavButtons;