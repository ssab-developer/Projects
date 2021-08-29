const express = require('express');
const app = express();

// converts the post request into json and extracts and put it in body keyword
app.use(express.json())

const authorRouter = require("./routers/authorRouter");
const db = require("./database/db");
const port = "8000";

app.use("/authors", authorRouter);

app.listen(port, () => {
    console.log(`Listining at http://localhost:${port}`)
});