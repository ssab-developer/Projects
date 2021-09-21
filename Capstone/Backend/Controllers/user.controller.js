// In Controllers we will define business logic for the path 

const userModel = require('../Models/user.model');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const nodemon = require('nodemon');

generateJwtToken = (_id) => {
    return jwt.sign({
        id: _id
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
}

signup = (req, res) => {
    const {
        email,
        firstName,
        lastName,
        password
    } = req.body;

    userModel.findOne({
        email: email

    }).exec((error, data) => {
        if (error) {
            console.log(error);

            return res.status(500).json({ //Its "500" because we are handling database level error- internal server error
                success: false,
                message: "Some Error occurred while searching for existing email. Contact your administrator"
            });
        }

        if (data) {
            return res.json({
                success: false,
                message: "User Email Already Exists."
            })
        }

        const _user = new userModel({
            email,
            firstName,
            lastName,
            password,
            userName: nanoid(10),

        });

        _user.save((error, user) => {

            if (error) {
                console.log(error)

                return res.status(500).json({
                    success: false,
                    message: "Some Error occurred while saving the user. Contact Administrator"
                });
            }

            if (user) {
                const token = generateJwtToken(user._id);
                return res.json({
                    success: true,
                    message: "User has been successfully saved",
                    data: { user, token: token }
                })
            }
        })
    });
}

signin = (req, res) => {

    const {
        email,
        password
    } = req.body

    userModel.findOne({
        email: email
    }).exec((error, data) => {

        if (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "DB Error occurred. Contact your administrator"
            })
        }
        if (data) {

            const isAuthenticate = data.authenticate(password);
            if (isAuthenticate) {

                const token = generateJwtToken(data._id);
                return res.json({
                    success: true,
                    message: "Logged in successfully",
                    data: { data, token: token }
                })
            }
            else {
                return res.json({
                    success: false,
                    message: "User Login failed. Bad Authentication "
                })
            }
        }
        else {
            return res.json({
                success: false,
                message: "User does'nt Exists."
            })
        }
    })
}


module.exports = {
    signup,
    signin
}


/**
 * It will only look for only ONE result in the DB
 * findOne will look for ONE result on your DB. which collects the model userModel
 * and It will execute if the query returns any response then "exec" will be executed
 * It has a call back function with 2 parameters ->1. error 2. data that we get.
 *
 *
 * ##IN NEW USER SAVE
 * the save function will have a different callback
 * Invoking the save function
 * In the callback we will get a response
 */