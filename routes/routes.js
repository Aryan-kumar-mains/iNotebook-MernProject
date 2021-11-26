import express from "express";
import { body, validationResult } from "express-validator";


// component
import { userSignup, userLoginIn, updateUser } from "../controller/userController.js";
import fetchUser from "../middleware/fetchUser.js";
import { addNotes, deleteNote, updateNote, userNotes } from "../controller/notesController.js";

const router = express.Router();

// ROUTE 1: Create a User "/api/auth/createUser". No login Required( Sign Up )
router.post("/api/auth/createUser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }), // for validation
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], userSignup);

// ROUTE 2:  user SignIn  No login Required
router.post("/api/auth/login", [
    body('email', 'Enter a valid Email').isEmail(),  // for validation
    body('password', "Password can't be blank").exists(),
], userLoginIn)

// ROUTE 3: Update loggedIn User Details using "/api/auth/updateUser". login required
router.post('/api/auth/updateUser', fetchUser, updateUser); // 'fetchUser' is a middleware, it is used to authenticate user wherever it required in project

// ROUTE 4: Get all the Notes using: GET "". Login required so we'll use middleware 'fetchUser'
router.get("/api/notes/fetchallnotes", fetchUser, userNotes);

// ROUTE 5: Add a new Note using : POST "/api/notes/addnote". Login required
router.post("/api/notes/addnote", fetchUser, [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "Description can'nt be empty").isLength({ min: 1 }),
], addNotes);

// ROUTE 6: Update an existing Note using : PUT "/api/notes/updatenote"
router.put("/api/notes/updatenote/:id", fetchUser, updateNote);  // for updating use 'put' request, we can use 'post' or 'get' also

// ROUTE 7: Delete an existing Note using : DELETE "/api/notes/deletenote"
router.delete("/api/notes/deletenote/:id", fetchUser, deleteNote);  // for deleting use 'DELETE' request, we can use 'post' or 'get' also

export default router;