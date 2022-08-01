

const mongoose = require ('mongoose')
const Category = mongoose.Schema({

    Category_name:{
        type: String
    },
  
   
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'staff'
    }
})

module.exports = mongoose.model('Category',Category)