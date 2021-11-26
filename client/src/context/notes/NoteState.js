import { useContext, useState } from "react"
import NoteContext from "./NoteContext";

import SignUpContext from "../user/SignUpContext";
import DB_ROUTE from "../../config.js";

/* make a state so that context holds all the state of Note and then it will usable in whole website */
const NoteState = (props) => {
  const { userData } = useContext(SignUpContext);

  const host = DB_ROUTE;

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial)

  // Get all notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": userData?.userToken
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call hoga yha
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": userData?.userToken
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    const note = {
      "_id": json._id,
      "user": json.user,
      "title": json.title,
      "description": json.description,
      "tag": json.tag,
      "date": "2021-10-26T02:33:25.876Z",
      "__v": 0
    }
    setNotes([...notes, note]);
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call hoga yha
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": userData?.userToken
      },
      body: JSON.stringify({ title, description, tag })
    });
    /* for showing the result of edit in home page */
    const json = await response.json();
    const editedNote = {
      "_id": json.note._id,
      "user": json.note.user,
      "title": json.note.title,
      "description": json.note.description,
      "tag": json.note.tag,
      "date": "2021-10-26T02:33:25.876Z",
      "__v": 0
    }
    setNotes(notes.map((note) => (
      note._id === editedNote._id ? editedNote : note
    )));
  }

  // Delete a note
  const deleteNote = async (id) => {
    // API call hoga yha
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": userData?.userToken
      }
    });
    const json = await response.json();
    console.log(json._id);
    console.log("Deleting the note with id: " + id);
    const newNotes = notes.filter((note) => (note._id !== id))
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
// after creating 'NoteState' wrap the whole component(i.e in App.js ) with this state so that it's used by all the components