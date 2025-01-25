import uploadProductPermission from '../../helpers/permission.js';
import productModel from '../../models/productModel.js';
export default async function updateProductController(req, res) {
    try {
        // Check for permission to update the product
        if (!await uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }
        const { _id,...resBody } = req.body;
        const updatedData = {
            ...resBody,
        };
        const updatedProduct = await productModel.findByIdAndUpdate(_id, updatedData, { new: true });
        res.json({
            message: "Product updated successfully",
            data: updatedProduct,
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
