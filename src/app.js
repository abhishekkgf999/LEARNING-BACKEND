import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//This allows your backend (API) to be accessed from another origin (like frontend React app).
//app.use => it is used for applying middleware,
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Allows Express to receive JSON data in the request body (like in POST, PUT requests).
//Only allow incoming JSON data up to 16 kilobytes.This protects your server from large/unsafe requests.
app.use(express.json({ limit: "16kb" }));

//Used to parse form data (HTML <form> submissions).
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Everything inside the public/ folder becomes accessible in the browser directly.
app.use(express.static("public"));

//This middleware makes it easy to read and set cookies in the browser.
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js';

//routes declaration
app.use("/api/v1/users", userRouter);  //Redirect to :- http://localhost:8000/api/v1/users/register


export { app };
