import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

/*
🔑 1. What is a Token?

=> A token is just a small piece of data (like an ID card) that proves who you are.

📌 After login, instead of asking for your password again and again,
the server gives you a token that says:

"This user is verified. Let him continue."

Think of it like:

Real Life	        Digital
Movie ticket	    Token
ID card	            Token
Entry pass	        Token

---------------------------------------------------------------------------------------------------------------

🔐 2. What is JWT?

JWT = JSON Web Token
It is a special type of token, which is:

✔ Secure
✔ Compact (small)
✔ Easily shareable (because it’s just a string)
✔ Used to verify user identity

Example of a JWT (just a string):

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJfaWQiOiIxMjMxMjMiLCJlbWFpbCI6ImFiQGdtYWlsLmNvbSIsImlhdCI6MTc0Mzk0NDczOCwiZXhwIjoxNzQzOTUxOTM4fQ.
LtPPRnTywpTR7osHn0mCt3ENC-Flj5dfmDlsY78Zt54

---------------------------------------------------------------------------------------------------------------

🧠 3. What is JWT Token?

It is simply a token that is created using JWT format.
It contains encoded user information and is digitally signed to prevent tampering.

🔹 It is automatically created when a user successfully logs in.
🔹 It is sent back to frontend and stored in cookie/localStorage.
🔹 It is used in future requests to verify the user.

🔍 JWT Token has 3 parts

HEADER->PAYLOAD->SIGNATURE

1️⃣ Header → Type & Algorithm used
{
  "alg": "HS256",
  "typ": "JWT"
} 

2️⃣ Payload → Actual user data (like ID, email, role)
{
  "_id": "654abc123",
  "email": "user@example.com",
  "role": "admin"
}

3️⃣ Signature → Security seal (Prevents token modification)

🔁 Login Flow with JWT (Simple Diagram)
🔹 User enters email & password
     |
     v
🔹 Backend checks and generates JWT token
     |
     v
🔹 Token sent to frontend (stored in cookie/localStorage)
     |
     v
🔹 Frontend sends token in every request (Authorization: Bearer <token>)
     |
     v
🔹 Backend verifies token using secret key
     |
     v
🔹 If valid → Allow access
*/

const videoSchema = new Schema({
  videoFile: {
    type: String, //cloudinary url
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

/*
🔹 What is a Plugin in Mongoose?
A plugin is simply a reusable piece of code that adds extra functionality to your Mongoose Schema.

🧩 "A plugin is an add-on feature that you attach to your schema to give it extra powers — without 
manually writing all the code yourself."


🛠 Real-life Example:

=> Want to hash passwords automatically? → Use mongoose-bcrypt plugin

=> Want to track createdAt / updatedAt? → Use timestamps plugin

=> Want to paginate results? → Use mongoose-paginate or mongooseAggregatePaginate plugin

=> Want to soft-delete documents? → Use mongoose-delete plugin

👉 So plugins help you add extra behavior to your schema easily.
*/
videoSchema.plugin(mongooseAggregatePaginate); //MEANING OF THIS LINE:- “I want to add pagination (page-based data fetching) for aggregation queries on the videoSchema.”
//🎯 Why do you need this?

// Normally, Mongoose has .find().limit().skip() pagination —
// but when you use aggregation pipelines, that simple pagination doesn’t work.

export const Video = mongoose.model("Video", videoSchema);
