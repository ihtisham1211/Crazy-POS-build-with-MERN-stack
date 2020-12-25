const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Product = require("../models/Product");

//@route Post api/product
//@desc Add product
//@access private
router.post(
  "/add",
  [
    auth,
    [
      check("name", "name is required").not().isEmpty(),
      check("price", "price is required").not().isEmpty(),
      check("quantity", "quantity is required").not().isEmpty(),
      check("category", "category is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const { name } = req.body;

      let newProduct = await Product.findOne({ name });

      if (newProduct) {
        return res.status(400).json({
          errors: [{ msg: "Product already exists with the same name" }],
        });
      }

      newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        user: req.user.id,
        brand: req.body.brand,
        productimg: req.body.productimg,
      });

      const product = await newProduct.save();
      res.json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route Post api/product/delete
//@desc delete  product
//@access private

router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await product.remove();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server error");
  }
});

//@route GET api/Products
//@desc GET all Products
//@access public
router.get("/", async (req, res) => {
  try {
    const product = await Product.find().sort({ date: -1 });
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/Products
//@desc GET all Products
//@access public
router.patch("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById();
    const upProduct = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          quantity: req.body.quantity,
          category: req.body.category,
          user: req.user.id,
          brand: req.body.brand,
        },
      }
    );
    res.json(upProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
