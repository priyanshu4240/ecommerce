import productModel from '../../models/productModel.js';

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;

        // Create a case-insensitive regular expression for the search query
        const regex = new RegExp(query, 'i');

        // Find products matching the search query in either productName or category
        const products = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        });

        res.json({
            data: products,
            message: "Search product list",
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

export default searchProduct;
