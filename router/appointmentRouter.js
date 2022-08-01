const express = require('express');
const router = new express.Router();
const appointment = require("../models/appointmentModel");
const auth = require("../auth/auth");



// route to book appointment
router.post("/customer/bookAppointment",auth.customerGuard, async(req,res)=>{
    console.log(req.customerInfo);
    const date = req.body.date;
    const time = req.body.time;
    const fullname = req.body.fullname;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const customerId = req.customerInfo._id;

    const appointmentDetails = await appointment.findOne({customerId: req.customerInfo._id,date:date,time:time});
    if(appointmentDetails == null){
        const data = new appointment({
            date : date,
            time: time,
            fullname : fullname,
            mobile : mobile,
            email : email,
            customerId : customerId,
        })

        data.save()
        .then(()=>{
            res.json({msg : "Appointment Booked"})
        })
        .catch((e)=>{
            res.json({msg : "Booking failed"})
        })
    } else{
        res.json({msg: "Already Appointment"})
    }
})

router.get("/customer/getBookedAppointment",auth.customerGuard, async (req,res)=>{
    console.log(req.customerInfo)
    const appointmentDetails = await appointment.find({customerId: req.customerInfo._id});
    if(!appointmentDetails){
        res.status(500).json({success : false})
    } else{
        res.status(201).json({
            success : true,
            data : appointmentDetails
        })
    }

})

router.get("/customer/getBookedAppointment/single/:apt_id",auth.customerGuard, async (req,res)=>{
    // console.log(req.customerInfo)
    const appointmentDetails = await appointment.findOne({_id : req.params.apt_id});
    if(!appointmentDetails){
        res.status(500).json({success : false})
    } else{
        res.status(201).json({
            success : true,
            data : appointmentDetails
        })
    }

})

router.put("/customer/updateBookedAppointment/:appointmentId", auth.customerGuard, async(req,res)=>{
    
    const fullname = req.body.fullname;
    const mobile = req.body.mobile;
    const email = req.body.email;

    appointment.updateOne(
            {_id : req.params.appointmentId},
            {
                fullname : fullname,
                mobile : mobile,
                email : email,
            }
        )
        .then(()=>{
            res.json({msg : "Updated"})
        })
        .catch((e)=>{
            res.json({msg : "Cannot Update"})
        })
})

router.delete("/customer/deleteBookedAppointment/:appointmentId", auth.customerGuard,(req,res)=>{
    const appointmentId = req.params.appointmentId;
    appointment.deleteOne({_id : appointmentId })
    .then(()=>{
        res.send({msg: "Appointment Deleted", success: true})
    })
    .catch((e)=>{
        res.send({msg: "Cannot Delete Appointment"})
    })
})




module.exports = router;