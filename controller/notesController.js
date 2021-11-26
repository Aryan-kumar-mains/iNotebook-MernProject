import { validationResult } from "express-validator";
import Notes from "../models/NotesSchema.js";


// Route 1: Get all the notes related to LoggedIn user using GET "/api/notes/fetchallnotes". Login Required
export const userNotes = async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});  // 'id' is available in req bcz of middleware 'fetchUser'
        res.json(notes);
    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).send("Internal Server Error");
    }
}


// Route 2: Get all the notes related to LoggedIn user using GET "/api/notes/fetchallnotes". Login Required
export const addNotes = async (req, res) => {
    try {
        const {title, description, tag} = req.body; // destructuring all the data which is written by user in note
    
        // for validation of Title and Description
        const errors = validationResult(req);
        if(!errors.isEmpty()) {  // if there are errors, return Bad request and the errors
            return res.status(400).json({errors: errors.array()});
        }
    
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
    
        res.json(savedNote)
        
    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).send("Internal Server Error");
    }
}

// ROUTE 3: Update an existing Note using : PUT "/api/notes/updatenote/:id". Login required
export const updateNote = async (req, res) => {
    try {
        const {title, description, tag} = req.body;

        // Create a newNote Object
        const newNote = {};
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};

        /*Find the note to be updated and update it */ 
        let note = await Notes.findById(req.params.id); // we can't use const note

        // If that note is not found
        if(!note) {return res.status(404).send("Not Found")}

        // If Other person changing Some others notes (means hacking)
        if(note.user.toString() != req.user.id) {  // req.body.id is a loggedIn user id & note.user.toString() gives an id of user from notes Schema
            return res.status(401).send("Not Allowed"); // and both id should be same, if not same then not allowed
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});

    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).send("Internal Server Error");
    }
}


// ROUTE 4: Delete an existing Note using : DELETE "/api/notes/updatenote/:id". Login required
export const deleteNote = async (req, res) => {
    try {
        /*Find the note to be deleted and delete it */ 
        let note = await Notes.findById(req.params.id); // we can't use const note

        // If that note is not found
        if(!note) {return res.status(404).send("Not Found")}

        // If Other person Deleting Some others notes (means hacking)
        if(note.user.toString() != req.user.id) {  // req.body.id is a loggedIn user id & note.user.toString() gives an id of user from notes Schema
            return res.status(401).send("Not Allowed"); // and both id should be same, if not same then not allowed
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been Deleted Successfully", note: note});

    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).send("Internal Server Error");
    }
}