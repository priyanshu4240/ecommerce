import bcrypt from 'bcryptjs';
import userModel from '../../models/userModel.js';
import jwt from 'jsonwebtoken';

export default async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        // Compare password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
            // Create JWT token data
            const tokenData = {
                _id: user._id,
                email: user.email,
            };

            // Generate JWT token
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            // Set cookie options
            const tokenOption = {
                httpOnly: true,
                secure: true,
            };

            // Set the cookie and send the response
            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false,
            });
        } else {
            throw new Error("Incorrect password");
        }

    } catch (err) {
        // Handle error
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}
