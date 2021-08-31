const mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    id: Number,
    name: {
        type: String,
        require: true
    },
    author: Array,
    publication: Array,
    language: {
        type: String,
        require: true
    },
    rating: Number,
    pages: Number,
    price: Number,
    catogory: Array
},{
    strict: true
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;