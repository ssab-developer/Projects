const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing

// Enable environmental file
const dotenv = require('dotenv');
dotenv.config(); // function is invoked

const db = require('./Database/db')
const app = express();

// enable environment file

app.use(cors()); //Middle wares
app.use(express.json());

const indexRouters = require('./Routers/index.router')

app.use('/api', indexRouters);

// Start Server Call
app.listen(process.env.PORT, () => {
    console.log(`Listing at http://localhost:${process.env.PORT}`)
});