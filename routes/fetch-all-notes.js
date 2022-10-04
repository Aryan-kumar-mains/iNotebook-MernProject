import express from "express";
import { body } from "express-validator";

// component
import {
  userSignup,
  userLoginIn,
  updateUser,
} from "../controller/userController.js";
import fetchUser from "../middleware/fetchUser.js";
import { userNotes } from "../controller/notesController.js";

const router = express.Router();

// ROUTE 4: Get all the Notes using: GET "". Login required so we'll use middleware 'fetchUser'
router.get("/api/notes/fetchallnotes", fetchUser, userNotes);

export default router;
