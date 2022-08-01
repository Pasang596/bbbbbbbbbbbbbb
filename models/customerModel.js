const mongoose = require("mongoose");
const customer = mongoose.Schema({
    Firstname:{
        type:String,
        // required: true
    },
    Lastname:{
        type:String,
        // required: true
    },
    Email:{
        type:String,
        // required : true
    },
    Username:{
        type:String,
        // required : true
    },
    Age:{
        type: Number
    },
    Date:{
        type: Number,
        // required : true
    },
    PhoneNumber:{
        type: String,
        // required : true
    },
    Password:{
        type: String
    },
    Location:{
        type: String,
        // required : true
    },
    Customer_image:{
        type:String

    }
})

module.exports = mongoose.model('Customer', customer);