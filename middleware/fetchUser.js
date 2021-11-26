import jwt from "jsonwebtoken";  // it is a protected layer btw client and server while logging, it gives a token to user at the time of signup and verify it at the time of logging

// const JWT_SECRET = process.env.JWT_SECRET;  // this is used as a signature while verifying token which is given by jwt
const JWT_SECRET = "imgoodboy";  // this is used as a signature while verifying token which is given by jwt

// Get the user from the jwt token and add id to req object using header
const fetchUser = (req, res, next) => {
    // getting token using header 
    const token = req.header("auth-token");

    // if token is not present
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }

    // if token is present then pull out the id after verifying the token
    try {
        const data = jwt.verify(token, JWT_SECRET);  // verify the signature in token and getting all the data of user
        req.user = data.user;  // adding user data in req
        next();  // The next function is a function which runs the next function or middleware in the Express router
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
}

export default fetchUser;