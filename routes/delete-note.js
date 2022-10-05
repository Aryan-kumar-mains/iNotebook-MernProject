import express from "express";

// component
import fetchUser from "../middleware/fetchUser.js";
import { deleteNote } from "../controller/notesController.js";

const router = express.Router();

// ROUTE 7: Delete an existing Note using : DELETE "/api/notes/deletenote"
router.delete("/api/notes/deletenote/:id", fetchUser, deleteNote); // for deleting use 'DELETE' request, we can use 'post' or 'get' also

export default router;
