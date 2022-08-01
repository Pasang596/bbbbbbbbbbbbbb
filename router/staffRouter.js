const express= require("express");
const router = new express.Router();
const auth = require("../auth/auth");
const staff = require("../models/staffModel");
const bcryptjs = require("bcryptjs");
const appointmentDT = require("../models/appointmentDTModel");
const appointment = require("../models/appointmentModel");
const jwt = require("jsonwebtoken");

router.post("/staff/login",(req,res)=>{
    const Email = req.body.Email;
    const Password = req.body.Password;
    staff.findOne({Email:Email})
    .then((staff_data)=>{
        if(staff_data==null){
            res.json({msg: "Invaild Credentials"})
            return;
        }
        bcryptjs.compare(Password,staff_data.Password,(e, result)=>{
            if(result == false){
                res.json({msg: "Invalid Credentials"})
                return;
            }
            ///now everything is valid

            //it creates the token for the login users
            //token stores login user id
            const token = jwt.sign({staffId: staff_data._id}, "softwarica");
            res.send({token: token});


        })  
    })
    .catch()
   

})



router.post("/staff/insert",(req,res)=>{
    const Email = req.body.Email;
    staff.findOne({Email: Email})
    .then((staff_data)=>{
        if(staff_data!=null){
            res.json({msg:"Email already exists"});
            return;
        }
        const Firstname = req.body.Firstname;
        const Lastname = req.body.Lastname;
        const Username = req.body.Username;
        const Password = req.body.Password;
        const Age = req.body.Age;
        const Date = req.body.Date;
        const PhoneNumber = req.body.PhoneNumber;
        const Location = req.body.Location;
        

        bcryptjs.hash(Password, 10, (e, hashed_pw)=>{

            const data = new staff({
                Firstname: Firstname,
                Lastname: Lastname,
                Username: Username,
                Email: Email,
                Password: hashed_pw,
                Age: Age,
                Date: Date,
                PhoneNumber: PhoneNumber,
                Location: Location
            })
            data.save()
            .then(()=>{
                res.json({msg: "register"})
            })
            .catch((e)=>{
                res.json({msg:"error"})
            });
        

        })
    
        
    
   
      
        
    })
    .catch()

})

//router for updating own profile
 router.put("/staff/update",auth.staffGuard,(req,res)=>{
     const Firstname = req.body.Firstname;
     const Lastname = req.body.Lastname;

     res.send("updated");
 })

// Router for appointment date and time 

// router for appointment date and time for a particular category 
router.post("/staff/appointment/dateAndtime", async(req,res)=>{
    const date = req.body.date;
    const time = req.body.time;
    // console.log(healthCategoryID)
    appointmentDT.findOne({date: date, time: time})
    .then((appointmentDTDetails)=>{
        // console.log(appointmentDTDetails)
        if(appointmentDTDetails != null){
            return res.json({msg: "Already DateAndTime"})
        }
        const data = new appointmentDT({
            date: date,
            time : time,
        })

        data.save()
        .then(()=>{
            res.json({msg : "Added DateandTime"})
        })
        .catch((e)=>{
            res.json({msg : "Cannot Add DateAndTime"})
            
        })
    })
    .catch((e)=>{
        res.json({msg : "Error"})
        console.log(e)
    })
})

router.get("/staff/appointment/dateAndtime", async (req,res)=>{
    const date = req.params.date;
    const appointmentDTList = await appointmentDT.find({})
    console.log(appointmentDTList)
    if(!appointmentDTList){
        res.status(500).json({
            success : false,
        })
    } else{
        res.status(201).json({
            success: true,
            data: appointmentDTList,
        })
    }
})

router.put("/staff/appointment/time/delete", async(req,res)=>{
    const date = req.body.date;
    const time = req.body.time;
    appointmentDT.updateOne(
            {date : date},
            {$pull:{"time" : time}}
        )
    .then(()=>{
        res.send({msg:"time deleted"})
    })
    .catch((e)=>{
        res.send({msg:"time couldnot be deleted"})
        console.log(e);

    })
})


router.put("/staff/appointment/time/add", async(req,res)=>{
    const date = req.body.date;
    const time = req.body.time;
    
    appointmentDT.findOne({date : date, time : time})
    .then((appointment_DT)=>{
        if(appointment_DT == null){
            appointmentDT.updateOne(
                    {date : date},
                    {$push:{"time" : time}}
                )
            .then(()=>{
                res.send({success:true ,msg:"time added"})
            })
            .catch((e)=>{
                res.send({msg:"time couldnot be added"})
                console.log(e);
    
            })
        } else{
            res.json({success: false,msg:"already same time on same date "})
        }
    })
    .catch((e)=>{
        res.json({success: false,msg:"couldnot find data"})

    })
    
})






module.exports = router
