const express = require("express");
const router = new express.Router();
const Category = require("../models/categoryModel");
const auth = require("../auth/auth");
const upload = require("../file/fileupload");


//route to insert category by customer

router.post("/category/insert",auth.staffGuard,(req,res)=>{
    const Category_name = req.body.Category_name;
    const userId = req.staffInfo._id;
    const data = new Category({
        Category_name : Category_name,
        userId : userId

    })
    data.save()
    .then(()=>{
        res.json({msg : "category inserted"})
    })
    .catch((e)=>{
        res.json({msg: "category not inserted"})

    })

})

router.put("/category/update/:cid",auth.staffGuard,(req,res)=>{
    const Category_name = req.body.Category_name;
    const cid = req.params.cid;
    // const data = new Category({
        // Category_name : Category_name,
        // userId : userId

    // })
    // data.save()

    Category.updateOne(
        { _id: cid },
        {
          Category_name: Category_name,
         
          
        }
      )
    .then(()=>{
        res.json({msg : "category updated"})
    })
    .catch((e)=>{
        res.json({msg: "category not updated"})

    })

})


// category delete

router.delete("/category/delete/:cid", auth.staffGuard,(req,res)=>{
    const cid = req.params.cid;
    Category.deleteOne({_id : cid})
    .then(()=>{
        res.json({msg: "deleted", success: true})
    })
    .catch(e=>{
        res.json(e)
    })
})



router.get('/category/display', async (req,res)=>{
    const category_data = await Category.find({})
    if (!category_data ) {
        res.status(500).json({success: false});
      } else {
        res.status(201).json({success: true, data: category_data});
      }
})


//display the category of logged in user


router.get("/category/single/:category_id", auth.staffGuard, (req,res)=>{
    Category.findOne({_id : req.params.category_id})
    .then((data)=>{
        res.json({data: data})
    })
    .catch((e)=>{
        res.json({error : e})
    })
})









module.exports = router;