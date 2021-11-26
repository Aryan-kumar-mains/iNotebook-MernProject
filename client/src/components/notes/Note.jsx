import React, { useEffect } from 'react'
import { Box, Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { useContext } from "react";

// component
import NoteContext from '../../context/notes/NoteContext';
import NoteItem from './NoteItem';
import SignUpContext from '../../context/user/SignUpContext';
import DialogContext from "../../context/dialogBox/DialogContext";
import CreateNote from "../CreateNote";

const useStyle = makeStyles({
    container: {
        margin: "auto"
    },
    root: {
        width: "100vw",
        height: "100vh",
    },
    btn: {
        padding: 0,
    }
})
const Note = () => {
    const classes = useStyle();

    const { notes, getNotes } = useContext(NoteContext);
    const { userData } = useContext(SignUpContext);
    const { open, setOpen, setText, setBtnText } = useContext(DialogContext);

    useEffect(() => { // for getting all the notes on home page
        getNotes();
    }, [userData]); // useEffect fetch all notes whenever user changes

    function openDialog() {   // this dialog for creating note
        setOpen(!open);
        setText("Create Your Note");
        setBtnText("Create");
    }
    const textForEmptyNote = <Box style={{ margin: "auto" }}>
        No Notes to display.
        <Button onClick={openDialog} className={classes.btn}><Typography style={{textDecoration: "underline", textDecorationColor: "blue"}}> Create </Typography></Button>
        Your First Note.
    </Box>

    return (
        <div>
            <Container className={classes.root}>
                <Typography variant="h3">Your Notes</Typography>
                <Grid style={{ marginTop: "15px" }} container spacing={3}>
                    {(!notes?.length || notes.length === 0) ? textForEmptyNote :
                        notes?.length && notes.map((note) => {
                            return (
                                <Grid item sm={3}>
                                    <NoteItem note={note} />
                                </Grid>
                            )
                        })
                    }

                </Grid>
            </Container>
            
            <CreateNote />  {/* this is a dialog box*/}
        </div>
    )
}

export default Note
