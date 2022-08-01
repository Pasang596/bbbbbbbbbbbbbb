const mongoose = require ('mongoose')

const Product = mongoose.Schema({
    Product_name:{
        type:String

    },
    Product_type:{
        type:String

    },
    Product_description:{
        type: String
    },
    Product_price:{
        type:String,
        // require:true
    },

    Product_quantity:{
        type: String
    },
    Product_category:{
        type: String
    },
    Product_image:{
        type:String
    },
    
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }

}) 
module.exports = mongoose.model('Product', Product)