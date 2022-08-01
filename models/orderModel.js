const mongoose = require("mongoose");

const Order = mongoose.Schema({
    order_item: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
        },
    }],
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    total_price: {
        type: Number,
    },
    order_status: {
        type: String,
    },
    payment_method: {
        type: String,
    },
    payment_status: {
        type: String,
    },
    address: {
        type: String,
    },
    contact_no: {
        type: String,
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", Order);