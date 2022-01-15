const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = mongoose.Schema(
  {
    serviceId: {
      type: String,
      required: [true, "Unique OrderId is required"],
      index: true,
      unique: true,
      trim: true,
    },
    dateOfOrder: {
      type: Date,
      required: [true, "An Order Must have a Date"],
    },
    totalAmount: Number,
    discountedAmount: Number,
    orderedBy: { type: "ObjectId", ref: "User" },
    mode: String,
    status: {
      type: "String",
      enum: [
        "Initiated",
        "Processed",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      required: [true, "An Order must contain a Status"],
      default: "Initiated",
    },
    products: [
      {
        count: Number,
        color: "String",
        product: { type: "ObjectId", ref: "ProductModel" },
      },
    ],
  },
  { timestamps: true }
);

const order = new mongoose.model("order", OrderSchema);
module.exports = order;
