import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //fs:- file system

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/*
It uploads a file (image/video/etc.) from your local computer to Cloudinary (cloud storage).
After upload, it returns the uploaded file’s information (URL, id, size, etc.)
*/
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null; //If file path doesn’t exist (user didn’t upload any file), Just stop function and return null.

    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", //Cloudinary automatically detects if it’s image, video, audio, or pdf
    });

    //file has been uploaded successfully
    console.log("File is uploaded on cloudinary ", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
