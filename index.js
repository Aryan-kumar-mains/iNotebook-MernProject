import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bodyParser from 'body-parser';
import path from 'path';


// components
import Routes from "./routes/routes.js";
import Connection from "./db.js";

const __dirname = path.resolve();

dotenv.config({ path: './.env' });

console.log(process.env.JWT_SECRET);

Connection(); // for connecting to mongodb via mongoose

const app = express();

app.use(express.json()); //for using req.body

// Available Routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", Routes);

// For deployment : To run React after deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


// Global error handling middleware
app.use((err, req, res, next) => {

    err.statusCode = err?.statusCode || 500;
    err.status = err?.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`iNotebook Server is successfully running on PORT ${port}`));


//install nodemon by writing e.g. npm i -D nodemon, -D for devDependencies so that it'l not be a part of our project