const express = require('express');
const router = express.Router();

const {
    getProduct,
    addNewProduct
} = require('../Controllers/product.controller')

const {
    isLoggedIn,
    isAdmin
} = require('../middleware/auth.middleware')

const {
    upload
} = require('../middleware/common.middleware')

// const {
//     validateCreateProductRequest,
//     isRequestCorrect
// } = require('../middleware/request.validator')

router.post('/create', isLoggedIn, isAdmin, upload.array('productPicture'), addNewProduct)
router.get('/get', getProduct)

module.exports = router;