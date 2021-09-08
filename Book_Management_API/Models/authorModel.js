const mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
    id: Number,
    age: Number,
    email: String,
    name: String,
    contact_no: String,
    country: String,
    gender: String,
    books_published: Array,
},{
    strict: true
});

const author = mongoose.model("Author", authorSchema);

module.exports = author;