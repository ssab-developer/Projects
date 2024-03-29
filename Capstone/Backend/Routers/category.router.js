const express = require('express');
const router = express.Router();

const {
    getCategory,
    addNewCategory
} = require('../Controllers/category.controller')

const {
    isLoggedIn,
    isAdmin
} = require('../middleware/auth.middleware')

const {
    validateCreateCategoryRequest,
    isRequestCorrect
} = require('../middleware/request.validator')

router.post('/create', isLoggedIn, isAdmin, validateCreateCategoryRequest, isRequestCorrect, addNewCategory)
router.get('/get', getCategory)

module.exports = router;