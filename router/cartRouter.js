const express = require("express");
const Cart = require("../models/cartModel");
const router = new express.Router();
const auth = require("../auth/auth");

router.post("/cart/insert", auth.customerGuard, (req, res) => {
  const data = Cart({
    pid: req.body.pid,
    user_id: req.customerInfo._id,
    quantity: req.body.quantity,
  });
  data
    .save()
    .then(() => {
      res.status(201).json({
        msg: "Product added to cart",
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

//Cart Get
router.get("/cart/get", auth.customerGuard, (req, res) => {
  Cart.find({ user_id: req.customerInfo._id })
    .populate("pid")
    .then((cart) => {
      if (cart != null) {
        res.status(201).json({
          success: true,
          data: cart,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

//Cart Delete
router.delete("/cart/delete/:cart_id", auth.customerGuard, (req, res) => {
  console.log(req.params.cart_id);
  Cart.deleteOne({ _id: req.params.cart_id })
    .then(() => {
      res.json({ msg: "Cart Deleted Successfully", success: true });
    })
    .catch((e) => {
      res.json({ msg: "Failed!" });
    });
});

module.exports = router;