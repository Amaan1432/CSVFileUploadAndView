const mongoose = require("mongoose");


// MAKING CONNECTION 

const dbconnect=mongoose.connect('mongodb://127.0.0.1:27017/CSVFileProject');


//setting it to db
const db = mongoose.connection;

// CHECKING CONNECTION
//if error occurs
db.on("error", console.error.bind(console, "Error connecting to DB"));
// when db connects successfully
db.once("open", function(){
    console.log("Successfully connected to DB");
});

module.exports = {db,dbconnect}
