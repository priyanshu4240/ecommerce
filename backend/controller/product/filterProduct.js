import productModel from '../../models/productModel.js';

const filterProductController = async (req, res) => {
    try {
        const categoryList = req.body?.category || [];

        // Find products where the category is in the provided list
        const products = await productModel.find({
            category: {
                "$in": categoryList
            }
        });

        res.json({
            data: products,
            message: "Products filtered by category",
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

export default filterProductController;
