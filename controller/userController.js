import express from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";  // for making hash of password in DB so that password is invisible
import jwt from "jsonwebtoken";  // it is a protected layer btw client and server while logging, it gives a token to user at the time of signup and verify it at the time of logging

// component
import User from "../models/UserSchema.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

const JWT_SECRET = process.env.JWT_SECRET  // this is used as a signature while verifying token which is given by jwt
console.log(process.env.JWT_SECRET);

// Route 1 : Sign Up  using POST "/api/auth/createUser"
export const userSignup = async (req, res) => {
    try {
        const user = User(req.body);

        // for validation of name, email, password
        const errors = validationResult(req);
        if (!errors.isEmpty()) {  //if there are errors, return Bad request and the errors
            return res.status(400).json({ errors: errors.array() });
        }

        // Check whether the user with this email exists already(for duplication)
        let exist = await User.findOne({ email: user.email });
        if (exist) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" });
        }

        // for incrypting the password by hashing and salt
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(user.password, salt);

        // create a new user if user doesn't exist
        const newUser = await User.create({
            name: user.name,
            email: user.email,
            password: secPassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const userToken = jwt.sign(data, JWT_SECRET); // token created
        console.log(newUser);

        // res.json(user);
        res.json({ user: newUser, userToken });  // send userInfo to front end( in context )

    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).send("Internal Server Error");
    }
}


// Route 2 : Login(Authenticate user) using POST "/api/auth/login" NO LOGIN required
export const userLoginIn = async (req, res) => {
    // for validation of name, email, password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {  //if there are errors, return Bad request and the errors
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // find user by email in DB
        let userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        // if user exist(means email is in DB) then compare the password
        const passwordCompare = await bcrypt.compare(password, userExist.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        // if password is matched then make token from id
        const data = {
            user: {
                id: userExist.id
            }
        }

        const userToken = jwt.sign(data, JWT_SECRET); // token created
        res.json({ user: userExist, userToken });

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).send("Internal Server Error");
    }
}

// Route 3 : Update user Details using POST "/api/auth/updateUser". Login required
export const updateUser = catchAsync(async (req, res, next) => {

    const { name, email } = req.body; // Destructuring all the data which came from the front-end

    const id = req.user.id;

    const oldUser = await User.findById(id);

    const emailExist = await User.findOne({ email });

    console.log("Email Exist", emailExist, oldUser);

    // if (emailExist && oldUser.email !== emailExist.email) { return res.status(404).send("This Email Already Exist!") }
    if (emailExist && oldUser.email !== emailExist.email) {
        return next(new AppError("Email is already exist", 401));
    }


    // if (!OldUser) { return res.status(401).send("You are not allowed! Try with other credentials.") }  //this will never happen because if user is not present then user get error by fetch user

    oldUser.email = email;
    oldUser.name = name;

    await oldUser.save();
    res.json(oldUser);
    // const userId = req.user.id;  // we get user id through middleware which comes with req
    // const user = await User.findById(userId).select("-password");  // all the details of user except password of respective user id 
    // res.send(user);
});

