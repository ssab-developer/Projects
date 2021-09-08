// In routes we will define parths or urls to particular resources
// In Controllers we will define business logic for the path 
//  Models are specifically the middle ware between NODE server and DATABASE

const express = require('express');
const router = express.Router();

const authorModel = require("../models/authorModel");

router.post('/', async (req, res) => {
    console.log(req);

    const {
        authorData
    } = req.body;

    //It will create a Mongo Document based on the Author Schema defined in Author Model 

    try {
        // express server will connect to database and available to express server

        const author = await authorModel.create(authorData);
        res.json({
            data: author,
            message: "Successful"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const author = await authorModel.find({}); // projection in mongoDB
        res.json({
            data: author,
            message: "Successful"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
});

router.get('/:author_id/getName=', async (req, res) => {
    const {
        author_id
    } = req.params
    try {
        const author = await authorModel.find({
            "id": author_id
        }, '-_id name'); //projection
        res.json({
            data: author,
            message: "Successful"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
});

router.put('/updateName', async (req, res) => {
    const {
        author_name,
        author_id
    } = req.body
    try {
        const author = await authorModel.updateMany({
            "id": author_id
        }, {
            "name": author_name
        });
        res.json({
            data: author,
            message: "Successful"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
});

router.delete('/delete/:author_id', async (req, res) => {
    const {
        author_id
    } = req.params
    try {
        const author = await authorModel.deleteOne({
            "id": author_id
        });
        res.json({
            data: author,
            message: "Successful"
        });
    } catch (error) {
        console.log(error);
        res.json({
            data: [],
            message: error
        });
    }
});

router.delete('/deleteAll', async (req, res) => {
    try {
        const author = await authorModel.deleteMany({});
        res.json({
            data: author,
            message: "Successful"
        });
    } catch (error) {
        console.log(error);
        res.json({
            data: [],
            message: error
        });
    }
});


module.exports = router;
