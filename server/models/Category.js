const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 32,

      required: [true, "A Category must have a name"],
      trim: true,
    },
    slug: {
      index: true,
      type: String,
      unique: true,
      required: [true, "A Slug is required"],
      lowercase: true,
    },
  },
  { timestamps: true }
);

//creating model
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
