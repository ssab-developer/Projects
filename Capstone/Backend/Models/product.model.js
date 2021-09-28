const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide your product name"],
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Please provide your product slug"],
        trim: true,
        unique: true
    },
    prize: {
        type: Number,
        required: [true, "Please provide your product prize"]
    },
    quantity: {
        type: Number,
        required: [true, "Please provide your product quantity"]
    },
    productPicture: [{
        img: {
            type: String,
        }
    }],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }


}, {
    timestamp: true
});

module.exports = mongoose.model('Product', productSchema);