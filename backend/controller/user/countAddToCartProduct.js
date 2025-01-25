import addToCartModel from '../../models/cartProduct.js';

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId; 

        // Count the number of documents for the current user
        const count = await addToCartModel.countDocuments({ userId });

        res.json({
            data: {
                count
            },
            message: "Ok",
            error: false,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export default countAddToCartProduct;
