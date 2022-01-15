const mongoose = require("mongoose");
const CouponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      uppercase: true,
      required: [true, "A COUPON MUST HAVE A NAME"],
      minLength: [6, "COUPON'S NAME SHOULD BE ATLEAST 6 CHARACTERS"],
      maxLength: [15, "COUPON'S NAME SHOULD BE MAXIMUM 15 CHARACTERS'"],
      index: true,
      unique: true,
    },
    expiry: {
      type: Date,
      required: [true, "A COUPON MUST HAVE AN EXPIRY DATE"],
    },
    discount: {
      type: Number,
      required: [true, "A COUPON MUST HAVE A DISCOUNT PERCENTAGE"],
    },
  },
  { timestamps: true }
);

const CouponModel = new mongoose.model("CouponModel", CouponSchema);
module.exports = CouponModel;
