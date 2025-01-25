import { uploadFilesToCloudinary } from '../../utils/features.js';  // Import the Cloudinary upload function

export default async function sendurl(req, res) {
    try {
        const files = req.files;
        const uploadedFiles = await uploadFilesToCloudinary(files);  // Upload files and get the URLs
        const imageUrl = uploadedFiles.map(file => file.url);
        res.status(201).json({
            error: false,
            success: true,
            imageUrl,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}
