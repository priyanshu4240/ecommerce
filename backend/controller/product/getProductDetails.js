import productModel from '../../models/productModel.js';

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;

        // Find product by ID
        const product = await productModel.findById(productId);

        res.json({
            data: product,
            message: "Ok",
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
};

export default getProductDetails;
