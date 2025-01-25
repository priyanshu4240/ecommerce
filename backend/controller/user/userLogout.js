export default async function userLogout(req, res) {
    try {
        // Clear the authentication token cookie
        res.clearCookie("token");

        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}
