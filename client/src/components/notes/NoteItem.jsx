import React, { useContext } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { textAlign } from '@mui/system';
import NoteContext from '../../context/notes/NoteContext';
import DialogContext from '../../context/dialogBox/DialogContext';

const useStyle = makeStyles({
    card: {
        // backgroundColor: "grey",
        // height: "186px"
    },
    iconButtons: {
        margin: "0 5px 0 5px"
    },
    icon: {
        padding: "5px",
    }
})
const NoteItem = (props) => {
    const classes = useStyle();
    
    const { note } = props;
    const {deleteNote, editNote} = useContext(NoteContext);
    const {open, setOpen, setText, setBtnText, initialContent, setInitialContent} = useContext(DialogContext);

    const handleEdit = () => {
        setInitialContent({ /* for adding note details into text field in dialog box*/
            currentId: note._id,
            title: note.title,
            tag: note.tag,
            description: note.description
        })
        setOpen(!open);  // for opening and closing of dialog on click the edit
        setText("Update Your Note");  // changing the heading of dialog
        setBtnText("Update");  // changing the text of button of dialog
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    title={note.title}
                    // subheader = {date}
                />
                <CardContent>
                    {/* <Typography variant="h5">{note.title}</Typography> */}
                    <Typography variant="subtitle1">
                        {note.description}
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }} >
                    <Button style={{ color: "#3f51b5" }}>Read more</Button>
                    <div className={classes.iconButtons}>
                        <IconButton style={{ color: "black" }} className={classes.icon}>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton onClick={handleEdit} style={{ color: "green" }} className={classes.icon}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => {deleteNote(note._id)}} style={{ color: "red" }} className={classes.icon}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default NoteItem
