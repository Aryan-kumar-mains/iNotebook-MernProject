import { makeStyles, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import { useContext } from "react";
import classNames from "classnames";  // this is used for adding classes dynamically & multiple classes


// component
import DrawerContext from "../context/drawer/DrawerContext";
import Note from "./notes/Note";

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
    }
}))
const Home = () => {
    const classes = useStyle();

    const { open, setOpen } = useContext(DrawerContext);

    return (
        <Box className={classes.container}>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <Note />
            </main>
        </Box>
    )
}

export default Home;

