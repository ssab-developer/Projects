// In routes we will define paths or urls to particular resources
const express = require("express");
const router = express.Router();
const {
    signup,
    signin
} = require('../Controllers/user.controller')

/** 
 * route /signup 
 *  
 * @params  
 * fullName 
 * email 
 * password 
 *  
 */

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;