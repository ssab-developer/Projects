const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    name: {
        type: String,
        require: [true, "Please provide your Category name"],
        trim: true
    },
    slug: {
        type: String,
        require: [true, "Please provide your Category slug"],
        trim: true,
        unique: true
    },
    type: {
        type: String,
    },
    parentId: {
        type: String
    },
    // createBy:{
    //     type:String
    // }
    

}, {
    timestamp: true
});

module.exports = mongoose.model('Category', categorySchema);