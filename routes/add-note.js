import express from "express";
import { body, validationResult } from "express-validator";

// component
import fetchUser from "../middleware/fetchUser.js";
import { addNotes } from "../controller/notesController.js";

const router = express.Router();

// ROUTE 5: Add a new Note using : POST "/api/notes/addnote". Login required
router.post(
  "/api/notes/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "Description can'nt be empty").isLength({ min: 1 }),
  ],
  addNotes
);

export default router;
