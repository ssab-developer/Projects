const jwt = require('jsonwebtoken');

const generateJwtToken = (id, role) => {
    console.log(id,role); 
    return jwt.sign({
        id: id,
        role: role
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
}

const ErrorArray = [];
ErrorArray[500] = "DB error ocurred. Contact your Administration"

const getErrorResponse = (statusCode, data = null, message = null) => {
    return {
        success: false,
        message: message || ErrorArray[statusCode]
    }
}

module.exports = {
    generateJwtToken,
    getErrorResponse
}