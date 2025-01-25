import mongoose from 'mongoose';

const addToCartSchema = new mongoose.Schema({
    productId: {
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId,
    },
    quantity: Number,
    userId: mongoose.Schema.Types.ObjectId,
}, {
    timestamps: true
});

const addToCartModel = mongoose.model("AddToCart", addToCartSchema);

export default addToCartModel;
