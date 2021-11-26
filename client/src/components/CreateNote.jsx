import { useContext, useEffect } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField, IconButton } from "@material-ui/core";
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

// component
import NoteContext from "../context/notes/NoteContext";
import { useState } from "react";
import DialogContext from "../context/dialogBox/DialogContext";
import SignUpContext from "../context/user/SignUpContext";

const useStyle = makeStyles((theme) => ({
    dialog: {
        margin: "auto",
        width: "500px",
        height: "500px",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        }
    },
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
    },
    closeBtn: {
        padding: "3px",
        margin: 5,
        cursor: "pointer",
    }
}));

const CreateNote = () => {
    const classes = useStyle();
    const { open, setOpen, text, btnText, initialContent, setInitialContent } = useContext(DialogContext);
    const { userData } = useContext(SignUpContext); // for checking Is user is logged in or not
    // console.log("User Data without login : ", userData);

    // Initial state of input text field in dialog for creating note or in updating the note
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    /* it update the note with refreshing the page */
    useEffect(() => {
        setNote({ title: initialContent.title, description: initialContent.description, tag: initialContent.tag })
    }, [initialContent]);

    // function for adding or editing note( from backend )
    const { addNote, editNote } = useContext(NoteContext);

    function onChange(event) {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    // for adding and editing notes on click of create or update button respectively
    function handleClick() {
        if (btnText === "Create") { // for creating note
            addNote(note.title, note.description, note.tag);
        }
        else { // for updating note
            editNote(initialContent.currentId, note.title, note.description, note.tag);
            setInitialContent({
                currentId: "",
                title: "",
                tag: "",
                description: ""
            })
        }
        setNote({})
        setOpen(!open);
    }
    function handleClose() {
        setOpen(!open);
        setNote({})
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            disableBackdropClick
        >
            <Box
                style={{ overflowX: "hidden" }}
                className={classes.dialogTitle}>
                <DialogTitle>{text}</DialogTitle>
                <IconButton variant="white">
                    <CloseIcon onClick={handleClose} className={classes.closeBtn} />
                </IconButton>
            </Box>
            <DialogContent
                dividers
                className={classes.dialog}
            >
                <DialogContentText>
                    <TextField   /* Title */
                        variant="outlined"
                        label="Title"
                        fullWidth
                        margin="dense"
                        type="text"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                    />
                    <TextField   /* Tag */
                        variant="outlined"
                        label="Tag"
                        multiline
                        maxRows={20}
                        fullWidth
                        margin="dense"
                        type="text"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                    />
                    <TextField  /* Description */
                        variant="filled"
                        label="Description"
                        multiline
                        maxRows={20}
                        fullWidth
                        margin="dense"
                        type="text"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {userData?.user ?
                    <Button onClick={handleClick} variant="contained" color="success" >{btnText}</Button>
                    :
                    <Tooltip title="You are not login please login first">
                        <span>
                            <Button disabled onClick={handleClick} variant="contained" color="success" >{btnText}</Button>
                        </span>
                    </Tooltip>

                }
                <Button onClick={handleClose} variant="text" color="error" autoFocus>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateNote;