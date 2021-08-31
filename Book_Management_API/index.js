const { json } = require('express');
const express = require('express');
const app = express();

app.use(express.json());

const port = "8080";

app.listen(port, ()=>{
    console.log(`Listining to http://localhost:${port}`);
})