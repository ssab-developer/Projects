const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing

const dotenv = require('dotenv');
dotenv.config(); // function is invoked

const db = require('./Database/db')
const app = express();

// enable environment file

app.use(cors()); //Midddle wares
app.use(express.json());

// Start Server Call
app.listen(process.env.PORT, () => {
    console.log(`Listing at http://localhost:${process.env.PORT}`)
});