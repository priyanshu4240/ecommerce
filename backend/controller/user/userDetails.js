import userModel from '../../models/userModel.js';

export default async function userDetailsController(req, res) {
    try {
        const user = await userModel.findById(req.userId);

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}
