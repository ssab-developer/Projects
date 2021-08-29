const mongoose = require('mongoose');
const password = encodeURIComponent('Bokhari@786');
// const url = 'mongodb+srv://vjtron:pass_123@cluster0.syhxj.mongodb.net/sample_airbnb?retryWrites=true&w=majority';
const url = `mongodb+srv://syed-sanaulla_049:${password}@cluster0.dozcc.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;

// Connect database URL (any type of url)
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbConn = mongoose.connection;
dbConn.on("error", console.error.bind(console, "Connection Error"));
dbConn.on('open', function(){
    console.log("DB Connection Successful");
});

module.exports = dbConn;

/**
 * MongoDB is offered by lot of different venders like Atlas
 * UnifiedTopology works on Cluster and navigate to database
 * */ 

/**
 * Models can be used to define some structure of our different collections
 * Models help us to define some structure (Schema)
 * Models define Schema of database
 */
