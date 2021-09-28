// In Controllers we will define business logic for the path 

const authModel = require('../../Models/auth.model');
const { nanoid } = require('nanoid');

const {
    generateJwtToken,
    getErrorResponse
} = require('../../helpers/helper');


const signup = (req, res) => {
    const {
        email,
        firstName,
        lastName,
        password
    } = req.body;

    authModel.findOne({
        email: email

    }).exec((error, data) => {
        if (error) {
            console.log(error);

            return res.status(500).json(getErrorResponse(false, "DB Error Occurred. Contact your administrator"));
        }

        if (data) {
            return res.json({
                success: false,
                message: "Admin Email Already Exists."
            })
        }

        const _admin = new authModel({
            email,
            firstName,
            lastName,
            password,
            role: 'admin',
            userName: nanoid(10),

        });

        _admin.save((error, admin) => {

            if (error) {
                console.log(error)

                return res.status(500).json({
                    success: false,
                    message: "Some Error occurred while saving the admin. Contact Administrator"
                });
            }

            if (admin) {
                const token = generateJwtToken(admin._id, admin._role);
                return res.json({
                    success: true,
                    message: "Admin Email has been Successfully saved",
                    data: {
                        user: {
                            fullName: data.fullName,
                            email: data.email
                        }
                    }, token: token

                }); 
            }
        })
    });
}

const signin = (req, res) => {

    const {
        email,
        password
    } = req.body

    authModel.findOne({
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

            if (data.role != 'admin') {
                return res.status(403).json({
                    success: false,
                    message: "Access Forbidden."
                })
            }

            const isAuthenticate = data.authenticate(password);
            if (isAuthenticate) {

                const token = generateJwtToken(data._id, data.role);
                return res.json({
                    success: true,
                    message: "Admin Logged in successfully",
                    data: {
                        data:
                        {
                            user: {
                                fullName: data.fullName,
                                email: data.email
                            }
                        }, token: token
                    }
                })
            }
            else {
                return res.json({
                    success: false,
                    message: "Admin Login failed. Bad Authentication "
                })
            }
        }
        else {
            return res.json({
                success: false,
                message: "Admin does'nt Exists."
            })
        }
    })
}


module.exports = {
    signup,
    signin
}
