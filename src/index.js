import dotenv from "dotenv";
import connectDB from "./db/index.js";

//APPROACH 2
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!! ", err);
  });

//APPROACH 1
/*
import express from "express";
const app = express();

//IIFE FUNCTION //Immediately Invoked Function Expression -> It runs automatically as soon as the browser reads it.
//STYNAX :- (function () => {})();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      //This code is listening for errors on the Express app. If the Express application (server) throws any internal error, this function will run and log the error.
      console.log("Error: ", error);
      throw error;
    });

    app.listen(process.env.PORT, ()=> { //app.listen() => Starts the Express server
      console.log(`App is listening on port ${process.env.PORT}`);
    })
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
})();
*/
