import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/*
In backend (Node.js + MongoDB with Mongoose), hooks are also called middleware functions 
that run automatically before or after certain actions in your schema — like saving, updating, deleting, validating, etc.
*/

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

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToekn: {
      type: String,
    },
  },
  { timestamps: true }
);

//encrypting password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//THIS IS A CUSTOM MADE METHOD TO CHECK IS PASSWORD IS CORRECT OR NOT, IT WILL RETURN TRUE || FALSE
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Creates a short-lived token (used for login sessions, API calls)
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

// Creates a long-lived token (used to get new access token when it expires)
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User", userSchema);
