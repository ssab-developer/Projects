// In routes we will define paths or urls to particular resources
/** 
 * route /signup 
 *  
 * @params  
 * fullName 
 * email 
 * password 
 *  
 */


const express = require("express");
const router = express.Router();
const {
    signup,
    signin
} = require('../Controllers/auth.controller')

const {
    validateSignInRequest,
    validateSignUpRequest,
    isRequestCorrect
} = require('../middleware/request.validator');

router.post('/signup', validateSignUpRequest, isRequestCorrect, signup);
router.post('/signin', validateSignInRequest, isRequestCorrect, signin);

module.exports = router;

/**
 * validateSignInRequest and isRequestCorrect, these 2 are acting as a custom middle wares
 * using 
 * 
 */