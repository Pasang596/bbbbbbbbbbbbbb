const mongoose = require("mongoose");
const staff = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Date : {
        type : Number
    }
    

})

module.exports = mongoose.model('Staff', staff);