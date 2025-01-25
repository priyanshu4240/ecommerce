import productModel from '../../models/productModel.js';

const getCategoryProduct = async (req, res) => {
    try {
        // Get distinct categories from products
        const productCategory = await productModel.distinct("category");

        // Array to store one product from each category
        const productByCategory = [];

        // Loop through each category and get one product
        for (const category of productCategory) {
            const product = await productModel.findOne({ category });

            if (product) {
                productByCategory.push(product);
            }
        }

        res.json({
            message: "Category products",
            data: productByCategory,
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

export default getCategoryProduct;
