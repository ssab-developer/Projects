const mongoose = require('mongoose')
const password = "Bokhari@786"

const url = `mongodb+srv://syed-sanaulla_049:${password}@cluster0.dozcc.mongodb.net/system_airbnb?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlPaser : true,
    useUnifiedTopology: true
});

const dbConn = mongoose.connection;
dbConn.on("error", console.error.bind(console, "Connection Error"))
dbConn.on("open", function(){
    console.log("DB Connection Successful");
});

module.exports = dbConn;


