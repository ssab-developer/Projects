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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        review:{
            type: String
        }
    }],
    updatedAt: Date
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);