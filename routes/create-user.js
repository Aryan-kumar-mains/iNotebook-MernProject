import express from "express";
import { body } from "express-validator";

// component
import { userSignup } from "../controller/userController.js";

const router = express.Router();

// ROUTE 1: Create a User "/api/auth/createUser". No login Required( Sign Up )
router.post(
  "/api/auth/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }), // for validation
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  userSignup
);

export default router;
