const mongoose = require('mongoose');

var publicationSchema = mongoose.Schema({
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
    authors_associated: Array,
    address:{
        type: String,
        require:true
    },
    age: Number,
    year_of_establish: Number,
    revenue: Number
},{
    strict: true
});

const publication = mongoose.model("Publication", publicationSchema);

module.exports = publication;