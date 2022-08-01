const mongoose = require("mongoose");

const appointmentDT = new mongoose.Schema({
    date :{
        type: String,
        require : true,
    },
    time:{
        type: Array,
        require : true,
    }
})

module.exports = mongoose.model("AppointmentDT", appointmentDT)