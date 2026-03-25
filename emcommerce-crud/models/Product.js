const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: Number,
        required: true,
        min: [1, "Price must be at least 1"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;