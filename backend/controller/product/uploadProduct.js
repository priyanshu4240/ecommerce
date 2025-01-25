import uploadProductPermission from '../../helpers/permission.js';
import productModel from '../../models/productModel.js';
import { uploadFilesToCloudinary } from '../../utils/features.js';  // Import the Cloudinary upload function

export default async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;

        // Check for permission to upload the product
        if (!await uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }
        const files = req.files;  // Get the uploaded files from the request
        const uploadedFiles = await uploadFilesToCloudinary(files);  // Upload files and get the URLs
        const uploadedImageUrls = uploadedFiles.map(file => file.url);
        // Combine the form data with the image URLs
        const productData = {
            ...req.body,
            productImage: uploadedImageUrls  // Store the Cloudinary image URLs in the product
        };
        // Create and save the new product with the uploaded image URLs
        const newProduct = new productModel(productData);
        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: savedProduct
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}
