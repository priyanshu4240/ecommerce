import addToCartModel from '../../models/cartProduct.js';

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        // Check if the product is already in the cart
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });
        if (isProductAvailable) {
            return res.json({
                message: "Already exists in Add to Cart",
                success: false,
                error: true
            });
        }

        // Create payload and save new cart item
        const payload = {
            productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product Added to Cart",
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

export default addToCartController;
