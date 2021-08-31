const mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
    id: Number,
    name: {
        type: String,
        require: true
    },
    contact_no:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    books_published: Array,
    country: {
        type: String,
        require: true
    },
    age: Number,
    gender:{
        type: String,
        require:true
    },
},{
    strict: true
});

const author = mongoose.model("Author", authorSchema);

module.exports = author;