const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide your Category name"],
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Please provide your Category slug"],
        trim: true,
        unique: true
    },
    type: {
        type: String,
    },
    parentId: {
        type: String
    },
    createBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    

}, {
    timestamp: true
});

module.exports = mongoose.model('Category', categorySchema);