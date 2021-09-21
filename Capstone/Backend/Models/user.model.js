//  Models are specifically the middle ware between NODE server and DATABASE

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Its a package that helps to hash your password

/**
 * 
 * User Schema 
 * 
 * @attribites
 * firstName
 * lastName
 * email
 * contact_number
 * hash_password
 * userName
 * 
 */

var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide your FirstName"],
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: [true, "Please provide your LastName"],
        trim: true, // It removes blank space in start and end of string
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: [true, "Please provide your Email"],
        trim: true, // It removes blank space in start and end of string 
        unique: true, // It has to be unique
        lowercase: true // All should be in lowercase
    },
    userName: {
        type: String,
        required: [true, "Please provide your Username"],
        trim: true, // It removes blank space in start and end of string
        unique: true,
        lowercase: true,
        index: true // One of our primary key
    },
    role: {
        type: String,
        enum: ["user", "admin", "super-admin"], // enumeration "role" will take either of these values only....
        default: "user"
    },
    contact_number: {
        type: String,
    },
    hash_password: {
        type: String,
        required: [true, "Please provide your Password"],
    }
}, {
    timestamps: true, // Configurations----- It tells when the document has created and when was it last updated
});

userSchema.virtual('password').set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 12)
})

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    this.firstName = fullName.split(' ')[0];
    this.lastName = fullName.split(' ')[1];
})

userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password)
    }
}
module.exports = mongoose.model('User', userSchema);

/**
 * If we use arrow functions in virtual set-password.... "this" keyword will point out to the "const userSchema"...
 * So instead of arrow function we will be using anonymous function --> It will point out to the new user which is present in router.
 * BASIC API FLOW:
 * client <--> node server [server.js <--> route <--> controller <--> model , save data to DB]
 *
 * In models before sending data to DB, it will check for virtual
 */

/**
 * Password should be always hashed
 * "virtual" is an attribute on your db that can be used for computational purposes
 * Virtual are properties not stored in database
 * They are only logically stored to perform computations on the document fields.
 */