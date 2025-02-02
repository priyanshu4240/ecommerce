export default async function userLogout(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        });

        return res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}
