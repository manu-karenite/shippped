const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A product must have a title"],
      text: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
      required: [true, "Unique slug is required"],
      lowercase: true,
    },
    description: {
      type: String,
      text: true,
      maxLength: 128,
      minLength: 3,
      required: [true, "Every product has a description"],
    },
    price: {
      type: Number,
      min: 1,
      required: [true, "Every Product has a price"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcategory: [
      {
        type: ObjectId,
        ref: "SubCategory",
      },
    ],
    quantity: {
      type: Number,
      required: [true, "A product has certain quantity"],
    },
    sold: {
      type: Number,
      required: [true, "Sold Units must be recorded"],
      default: 0,
    },
    images: Array,
    shipping: {
      type: Boolean,
      enum: [true, false],
      required: [true, "Shipping Protocol must be reported"],
    },
    color: {
      type: String,
      required: [true, "Color Specifications are necessary"],
      enum: ["black", "silver", "red", "golden", "cyan"],
    },
    brand: {
      type: String,
      required: [true, "A product must belong to a brand"],
      enum: ["apple", "samsung", "microsoft", "asus", "lenovo"],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const ProductModel = new mongoose.model("ProductModel", ProductSchema);
module.exports = ProductModel;
