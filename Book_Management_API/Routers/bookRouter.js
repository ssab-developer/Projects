const express = require('express');
const router = express.Router();

const bookModel = require("../Models/bookModel");

router.post('/', async (req, res) => {
    console.log(req);
    const {
        bookData
    } = req.body;

    try {
        const book = await bookModel.create(bookData);

        res.json({
            data: book,
            message: Successful
        });
    }
    catch(error){
        res.json({
            data: [],
            message: "Error"
        });
    }
});