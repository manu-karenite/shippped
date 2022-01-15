const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 32,

      required: [true, "A SubCategory must have a name"],
      trim: true,
    },
    slug: {
      index: true,
      type: String,
      unique: true,
      required: [true, "A Slug is required"],
      lowercase: true,
    },
    parent: {
      type: ObjectId,
      ref: "Category",
      required: [true, "Each SubCategory should belong to Category"],
    },
  },
  { timestamps: true }
);

//creating model
const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
module.exports = SubCategory;
