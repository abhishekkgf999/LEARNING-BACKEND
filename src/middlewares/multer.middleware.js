import multer from "multer";

/*
🧠 What is Multer?

Multer is a Node.js middleware used with Express to handle file uploads, especially when users upload files like:

✔ Images (Profile pictures)
✔ Videos
✔ PDFs / Documents
✔ Audio files

It helps you receive files from frontend (like forms or API requests) and store them temporarily on your server.

🌐 Why can't Express handle file uploads directly?

Because normal Express can’t read files like images, videos, or PDFs from the request body.
req.body only supports text, JSON, form data, but not files.

That's why we need Multer — it reads files from requests and makes them available in req.file or req.files.
*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
