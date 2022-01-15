const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartSchema = mongoose.Schema(
  {
    products: [
      {
        count: Number,
        color: String,
        price: Number,
        product: {
          type: ObjectId,
          ref: "Product",
        },
      },
    ],
    cartTotal: Number,
    discountedPrice: Number,
    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CartModel = new mongoose.model("CartModel", CartSchema);
module.exports = CartModel;
