import addToCartModel from '../../models/cartProduct.js';

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId;
        // Find all cart items for the current user and populate product details
        const allProduct = await addToCartModel.find({ userId: currentUser })
            .populate('productId');
        res.json({
            data: allProduct,
            success: true,
            error: false
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

export default addToCartViewProduct;
