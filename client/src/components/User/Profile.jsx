import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import classNames from "classnames";  // this is used for adding classes dynamically & multiple classes


// component
import DrawerContext from "../../context/drawer/DrawerContext";
import SignUpContext from "../../context/user/SignUpContext";

const drawerWidth = 225;

const useStyle = makeStyles((theme) => ({
    container: {
        marginTop: 50,
    },
    content: {
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: drawerWidth
    },
    root: {
        // width: "350px",
        margin: "10px 0 10px 0"
    },
    saveChanges: {
        backgroundColor: "rgba(48, 70, 240)",
        color: "white",
        // margin: "10px 0 20px 0",
    },
}))

const Profile = () => {
    const classes = useStyle();
    const { open } = useContext(DrawerContext);
    const { userData, updateProfile } = useContext(SignUpContext);

    const [userInfo, setUserInfo] = useState({
        // id: userData.user._id,  // This is not recommended because Id is present in auth token and we get id by fetch user middleware
        name: userData?.user.name,
        email: userData?.user.email
    });

    const onChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
    }
    const handleClick = (event) => {
        event.preventDefault();
        updateProfile(userInfo);
    }
    return (
        <Box className={classes.container}>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <form onSubmit={handleClick}>
                    <Grid >
                        <Grid className={classes.root} item>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                // fullWidth
                                label="Name"
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid className={classes.root} item>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                // fullWidth
                                label="Email"
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button className={classes.saveChanges} variant="contained" type="submit">Save Changes</Button>
                </form>
            </main>
        </Box>
    )
}

export default Profile;