import userModel from "../../models/userModel.js";
import bcrypt from 'bcryptjs';
import { uploadFilesToCloudinary } from '../../utils/features.js';

export default async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;
        const files = req.file; 
        const user = await userModel.findOne({ email });
        if (user) {
            throw new Error("User already exists.");
        }
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!name) {
            throw new Error("Please provide name");
        }

        let profilePicUrl = '';  // Default to empty string if no image is uploaded

        // Check if the user uploaded an image
        if (files) {
            const uploadedImageUrls = await uploadFilesToCloudinary([files]);  // Upload to Cloudinary and get URL
            if (uploadedImageUrls && uploadedImageUrls.length > 0) {
                profilePicUrl = String(uploadedImageUrls[0].url);
            } else {
                throw new Error("Image upload failed.");
            }
        }

        // Generate salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong while hashing the password");
        }
        // Prepare payload for user creation
        const payload = {
            email,
            name,
            password: hashPassword,
            profilePic:profilePicUrl,  // Use uploaded image URL or empty string
            role: "GENERAL"
        };

        // Create new user and save to the database
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        // Send success response
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch (err) {
        // Send error response
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}
