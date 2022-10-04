import express from "express";
import { body, validationResult } from "express-validator";

// component
import fetchUser from "../middleware/fetchUser.js";
import { updateNote } from "../controller/notesController.js";

const router = express.Router();

// ROUTE 6: Update an existing Note using : PUT "/api/notes/updatenote"
router.put("/api/notes/updatenote/:id", fetchUser, updateNote);
// for updating use 'put' request, we can use 'post' or 'get' also

export default router;
