const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    categories: {
      type: String
    },
    size: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    },
    medium: {
      type: String
    },
    style: {
      type: String
    },
    subject: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
