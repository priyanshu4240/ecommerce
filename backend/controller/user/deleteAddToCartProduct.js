import addToCartModel from '../../models/cartProduct.js';

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        // Delete the cart item for the current user
        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId, userId: currentUserId });

        res.json({
            message: "Product deleted from cart",
            error: false,
            success: true,
            data: deleteProduct
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

export default deleteAddToCartProduct;
