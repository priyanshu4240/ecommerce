import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { v4 as uuid } from 'uuid';
import {v2 as cloudinary} from "cloudinary";
const connectDB =  async()=>{
    try {
        const data= await mongoose.connect(process.env.MONGO_URI,{
            dbName:'Ecommerce'
        })
        console.log(`Connected to DB: ${data.connection.host}`)
    } catch (error) {
        console.log('failed to connect to db',error);
        process.exit(1);
    }
}
const getBase64 = (file) => {
    const base64String = file.buffer.toString('base64');
    return `data:${file.mimetype};base64,${base64String}`;
  };
  
  const uploadFilesToCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          getBase64(file),
          {
            resource_type: "auto", // Let Cloudinary determine the type (image, video, etc.)
            public_id: uuid(), // Generate a unique public ID for each upload
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    });
  
    try {
      const results = await Promise.all(uploadPromises);
      const formattedResults = results.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));
      return formattedResults;
    } catch (err) {
      throw new Error("Error uploading files to Cloudinary");
    }
  };
const validatehandler=(req,res,next)=>{
    const errors=validationResult(req);
    const errorMessages=errors.array().map((error)=>error.msg).join(", ");
    if (errors.isEmpty()) return next();
    else {
        throw new Error(errorMessages,400);
    }
}
export {connectDB,uploadFilesToCloudinary,validatehandler};