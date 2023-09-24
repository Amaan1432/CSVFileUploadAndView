const mongoose = require('mongoose');


const csvSchema= new mongoose.Schema({
    filename:{
        type:String,
        required : true,
    },
    originalname:{
        type:String,
        required : true,
    },
    path :{
        type:String,
        required : true,
    }
},
{
    timestamps:true
})

const CSV = mongoose.model('CSV',csvSchema);

module.exports = CSV;