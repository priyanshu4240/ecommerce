import bcrypt from 'bcryptjs';
import userModel from '../../models/userModel.js';
import jwt from 'jsonwebtoken';

export default async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Please provide email and password");
        }

        const user = await userModel.findOne({ email });
        if (!user) throw new Error("User not found");

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) throw new Error("Incorrect password");

        // Create JWT token
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        // Set Cookie Options
        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None"
        };

        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successful",
            success: true,
        });

    } catch (err) {
        res.status(400).json({ message: err.message, error: true });
    }
}
