const express = require('express');
const { modelName } = require('../Models/authorModel');
const router = express.Router();

const {
    checkUndefNul
} = require('../helpers/validation.helper')

const authorModel = require("../Models/authorModel");
const bookModel = require("../Models/bookModel")

router.post('/', async (req, res) => {
    console.log(req);

    const {
        id,
        age,
        email,
        name,
        contact_no,
        country,
        gender,
        books_published,
    } = req.body;


    // validate data manaully (id should be present)
    var errorMessage = []
    if (checkUndefNul(id)) {
        errorMessage.push("ID is invalid");
    }

    if (checkUndefNul(age) || authorData.age == 0) {
        errorMessage.push("Age is invalid");
    }

    if (checkEmail(email)) {
        errorMessage.push("Email is invalid");
    }

    try {
        const author = await authorModel.create(authorData);
        res.json({
            data: author,
            message: "Successfull"
        });
    }
    catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
});

router.get('/:author_id/getBooks=', async (req, res) => {
    const {
        author_id
    } = req.params
    try {
        const books_published = await authorModel.find({
            "id": author_id
        }, 'books_published -_id -__v'); //projection

        console.log(books_published);


        // Get all books whose id is present in books_published
        const books_data = await bookModel.find({
            "id": {
                $in: books_published //MongoDB operations
            }
        });

        res.json({
            data: books_data,
            message: "Successful"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
});

module.exports = router;
