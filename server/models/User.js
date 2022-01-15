const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "A user needs a email"],
      index: true,
      unique: true,
    },
    role: {
      type: String,
      default: "Subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    wishlist: {
      type: [{ type: "ObjectId", ref: "ProductModel" }],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
