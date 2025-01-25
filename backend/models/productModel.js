import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    description: String,
    Price: Number,
    sellingPrice: Number
}, {
    timestamps: true
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
