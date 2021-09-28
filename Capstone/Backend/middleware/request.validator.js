const { check, validationResult } = require('express-validator');

const validateSignUpRequest = [
    check('firstName').notEmpty().withMessage("First Name is required"),
    check('lastName').notEmpty().withMessage("Last Name is required"),
    check('email').isEmail().withMessage("Validate Email is required"),
    check('password').isLength({ min: 6 }).withMessage("Password with Min Length should be 6 characters")
]

const validateSignInRequest = [
    check('email').isEmail().withMessage("Validate Email is required"),
    check('password').isLength({ min: 6 }).withMessage("Password with Min Length should be 6 characters")
]

const validateCreateCategoryRequest = [
    check('name').notEmpty().withMessage("Category Name is required"),
]

// const validateCreateProductRequest = [
//     check('name').notEmpty().withMessage("Category Name is required"),
//     check()
// ]

const isRequestCorrect = (req, res, next) => {
    const errors = validationResult(req); // Array of errors

    if (errors.array().length > 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid Request",
            errors: errors.array()[0].msg
        })
    }

    next(); // This next function is used to passes request ahead  
}

module.exports = {
    validateSignUpRequest,
    validateSignInRequest,
    validateCreateCategoryRequest,
    validateCreateProductRequest,
    isRequestCorrect,
}