
const express = require("express");
const bcryptjs = require("bcryptjs");

const customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const router = new express.Router();
router.use(express.json());
const auth = require("../auth/auth");
const upload = require("../file/fileupload");



router.post("/customer/insert",(req,res)=>{
    // console.log(jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj)
    const Email = req.body.Email;
    customer.findOne({Email: Email})
    .then((cust_data)=>{
        if(cust_data!=null){
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
        const Email = req.body.Email;


        bcryptjs.hash(Password, 10, (e, hashed_pw)=>{

            const data = new customer({
                Firstname: Firstname,
                Lastname: Lastname,
                Username: Username,
                Email: Email,
                Password: hashed_pw,
                Age: Age,
                Date: Date,
                PhoneNumber: PhoneNumber,
                Location: Location,
                // Product_image : Product_image
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

//login 



router.post("/customer/login",(req,res)=>{
    const Email = req.body.Email;
    const Password = req.body.Password;
    customer.findOne({Email:Email})
    .then((cust_data)=>{
        if(cust_data==null){
            res.json({msg: "Invaild Credentials"})
            return;
        }
        bcryptjs.compare(Password,cust_data.Password,(e, result)=>{
            if(result == false){
                res.json({msg: "Invalid Credentials"})
                return;
            }
            ///now everything is valid

            //it creates the token for the login users
            //token stores login user id
            const token = jwt.sign({customerId: cust_data._id}, "softwarica");
            res.send({token: token});


        })  
    })
    .catch()
   

})

//this is dashboard route for customer 

router.get("/customer/dashboard",auth.customerGuard,(req,res)=>{
    console.log(req.customerInfo.Firstname);
    res.json({
        Firstname: req.customerInfo.Firstname,
        Lastname: req.customerInfo.Lastname,
        Username: req.customerInfo.Username,
        Email: req.customerInfo.Email,
        Password: req.customerInfo.Password,
        Age: req.customerInfo.Age,
        Date: req.customerInfo.Date,
        Location: req.customerInfo.Location,
        PhoneNumber: req.customerInfo.PhoneNumber,
       

    })

})

//this is dashboard update route 
router.put("/customer/update",auth.customerGuard,(req,res)=>{
    
    customer.updateOne(
        {_id:req.customerInfo._id},
        {
            Firstname : req.body.Firstname,
            Lastname: req.body.Lastname,
            Username: req.body.Username,
            Age: req.body.Age,
            Location: req.body.Location,
            PhoneNumber: req.body.PhoneNumber,
        }
    )
    .then(()=>{
        res.json({msg:"updated"})
    })
    .catch((e)=>{
        res.json({msg:"cannot update"})
    })

})
router.put("/Customer/photoupdate",auth.customerGuard,upload.single('cust_image'),(req,res)=>{
    // console.log(req.customerInfo_id)
    if(req.file==undefined){
        return res.json({msg: " Invalid file format" })
    }


    customer.updateOne(
    {_id: "req.customerinfo._id"}),
    {customer_image : req.file.filename}

    .then(()=>{
        res.json({msg: "Photo Added"})

    })
    .catch((e)=>{
        res.json({msg: " Photo Couldn't be added"})

    })


    res.send({msg: "test"})
    console.log(req.file.filename)
  

})

//This is for testing only. we will delete it later 
// router.delete('/comment/delete',auth.customerGuard,(req,res)=>{
//     res.json({message : "deleted"})
// })



module.exports = router;
