const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
    date : {
        type : String,
        require : true
    },
    time:{
        type: String,
        require : true
    },
    fullname : {
        type : String,
        require : true
    },
    mobile : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    }
})

module.exports = mongoose.model("Appointment", appointment)