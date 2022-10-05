import express from "express";
import { body } from "express-validator";

// component
import { userLoginIn } from "../controller/userController.js";

const router = express.Router();

// ROUTE 2:  user SignIn  No login Required
router.post(
  "/api/auth/login",
  [
    body("email", "Enter a valid Email").isEmail(), // for validation
    body("password", "Password can't be blank").exists(),
  ],
  userLoginIn
);

export default router;
