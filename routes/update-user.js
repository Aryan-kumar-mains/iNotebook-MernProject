import express from "express";
import { body } from "express-validator";

// component
import {
  userSignup,
  userLoginIn,
  updateUser,
} from "../controller/userController.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

// ROUTE 3: Update loggedIn User Details using "/api/auth/updateUser". login required
router.post("/api/auth/updateUser", fetchUser, updateUser);
// 'fetchUser' is a middleware, it is used to authenticate user wherever it required in project

export default router;
