const mongoose = require("mongoose");


// MAKING CONNECTION 

// const dbconnect=mongoose.connect('mongodb://127.0.0.1:27017/CSVFileProject');

const url = 'mongodb+srv://amaan1432:jpladiFXLD1wtEPD@cluster0.wqiwl1y.mongodb.net/CSVFileUploadAndView?retryWrites=true&w=majority';
const dbconnect=mongoose.connect(url)
.then(()=>{
    console.log('Connection successful!');
}).catch((err) => console.log("no connection " + err));



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
