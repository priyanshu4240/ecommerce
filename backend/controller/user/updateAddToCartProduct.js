import addToCartModel from '../../models/cartProduct.js';

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body?._id;
        const qty = req.body.quantity;

        // Update the cart item with the new quantity
        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId, userId: currentUserId },
            { ...(qty && { quantity: qty }) }
        );

        res.json({
            message: "Product updated",
            data: updateProduct,
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

export default updateAddToCartProduct;
