const mongoose = require("mongoose");

const Cart = mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    quantity: {
        type: Number,
    },
});

module.exports = mongoose.model("Cart", Cart);