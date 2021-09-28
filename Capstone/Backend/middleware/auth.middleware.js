const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    if (req.headers.authorization) {
        let user = {}
        const token = req.headers.authorization.split(' ')[1];
        try {
            user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log("User data from token: "); 
            console.log(user);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request",
                error: error
            });
        }
        req.user = user;

        // req{

        // }
    }
    else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Request"
        });
    }
    next()
}

const isUser = (req, res, next) => {
    if (req.user.role != 'user') {
        return res.status(403).json({
            success: false,
            message: "Access Forbidden."
        })
    }
    next();
}

const isAdmin = (req, res, next) => {
    if (req.user.role == 'user') {
        return res.status(403).json({
            success: false,
            message: "Access Forbidden."
        })
    }
    next();
}
 
module.exports = {
    isLoggedIn,
    isUser,
    isAdmin
}