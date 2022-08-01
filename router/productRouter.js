const express = require("express");
const router = new express.Router();
const Product = require("../models/productModel");
const auth = require("../auth/auth");
const upload = require("../file/fileupload");

//route to insert product by customer

router.post(
  "/product/insert",
  auth.staffGuard,
  upload.single("pimage"),
  (req, res) => {
    const Product_name = req.body.Product_name;
    const Product_type = req.body.Product_type;
    const Product_description = req.body.Product_description;
    const Product_price = req.body.Product_price;
    const Product_quantity = req.body.Product_quantity;
    const Product_category = req.body.Product_category;
    const Product_image = req.file.filename;
    const userId = req.staffInfo._id;
    const data = new Product({
      Product_name: Product_name,
      Product_category: Product_category,
      Product_description: Product_description,
      Product_price: Product_price,
      Product_type: Product_type,
      Product_image: Product_image,
      Product_quantity: Product_quantity,
      userId: userId,
    });
    data
      .save()
      .then(() => {
        res.json({ msg: "product inserted" });
      })
      .catch((e) => {
        res.json({ msg: "product not inserted" });
      });
  }
);

router.put(
  "/product/update/:pid",
  auth.staffGuard,
  upload.single("pimage"),
  (req, res) => {
    const Product_name = req.body.Product_name;
    const Product_type = req.body.Product_type;
    const Product_description = req.body.Product_description;
    const Product_price = req.body.Product_price;
    const Product_category = req.body.Product_category;
    const Product_quantity = req.body.Product_quantity;

    // const userId = req.customerInfo._id;
    const pid = req.params.pid;

    if (req.file == undefined) {
      Product.updateOne(
        { _id: pid },
        {
          Product_name: Product_name,
          Product_category: Product_category,
          Product_description: Product_description,
          Product_price: Product_price,
          Product_type: Product_type,
          // Product_image : Product_image,
          Product_quantity: Product_quantity,
          // userId: userId,
        }
      )
        .then(() => {
          res.json({ msg: "product updated" });
        })
        .catch((e) => {
          res.json({ msg: "product not updated" });
        });
    } else {
      Product.updateOne(
        { _id: pid },
        {
          Product_name: Product_name,
          Product_category: Product_category,
          Product_description: Product_description,
          Product_price: Product_price,
          Product_type: Product_type,
          Product_image: req.file.filename,
          Product_quantity: Product_quantity,
          // userId: userId,
        }
      )
        .then(() => {
          res.json({ msg: "product updated" });
        })
        .catch((e) => {
          res.json({ msg: "product not updated" });
        });
    }
  }
);

// product delete

router.delete("/product/delete/:pid", auth.staffGuard, (req, res) => {
  const pid = req.params.pid;
  Product.deleteOne({ _id: pid })
    .then(() => {
      res.json({ msg: "deleted", success: true });
    })
    .catch((e) => {
      res.json(e);
    });
});

router.get("/product/display", async (req, res) => {
  const product_data = await Product.find({});
  if (!product_data) {
    res.status(500).json({ success: false });
  } else {
    res.status(201).json({ success: true, data: product_data });
  }
});

//display the product of logged in user

router.get("/product/single/:product_id", (req, res) => {
  Product.findOne({ _id: req.params.product_id })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((e) => {
      res.json({ error: e });
    });
});

module.exports = router;
