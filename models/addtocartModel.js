const mongoose = require("mongoose");

const AddToCart = mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    userId:{
       
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    Product_quantity: {
        type: Number,
    },
});

module.exports = mongoose.model("AddToCart", AddToCart);