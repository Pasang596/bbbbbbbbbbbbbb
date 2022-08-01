const express = require("express");
const app = express()
const cors = require('cors');
require("./connection/database");
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname+'/product'));


const customerRouter = require("./router/customerRouter");
app.use(customerRouter);

const staffRouter = require("./router/staffRouter");
app.use(staffRouter);

const productRouter = require("./router/productRouter");
app.use(productRouter);

const categoryRouter = require("./router/categoryRouter");
app.use(categoryRouter);

const appointmentRouter = require("./router/appointmentRouter");
app.use(appointmentRouter);

const cartRouter = require("./router/cartRouter");
app.use(cartRouter);

const orderRouter = require("./router/orderRouter");
app.use(orderRouter);




app.listen(90)