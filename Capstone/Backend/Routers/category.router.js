const express = require('express');
const router = express.Router();

const {
    getCategory,
    addNewCategory } = require('../Controllers/category.controller')

router.post('/create', addNewCategory)
router.get('/get', getCategory)


module.exports = router;