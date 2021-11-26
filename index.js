import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// components
import Routes from "./routes/routes.js";
import Connection from "./db.js";


dotenv.config({ path: './.env' });

console.log(process.env.JWT_SECRET);

Connection(); // for connecting to mongodb via mongoose

const app = express();
const PORT = 5000;

app.use(express.json()); //for using req.body

// Available Routes
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


app.listen(PORT, () => console.log(`iNotebook Server is successfully running on PORT ${PORT}`));


//install nodemon by writing e.g. npm i -D nodemon, -D for devDependencies so that it'l not be a part of our project