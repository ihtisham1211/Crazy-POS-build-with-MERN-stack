const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  productimg: {
    type: String,
  },
});

module.exports = Product = mongoose.model("product", productSchema);
