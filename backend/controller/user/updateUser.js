import userModel from '../../models/userModel.js';

export default async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, email, name, role } = req.body;

        // Prepare the payload with only the fields that are provided
        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

        // Find the session user (though it's not used here, maybe for future validation)
        const user = await userModel.findById(sessionUser);

        // Update the user based on the provided userId and payload
        const updateUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        res.json({
            data: updateUser,
            message: "User Updated",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}
