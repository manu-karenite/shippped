const express = require("express");
const RRR = express.Router();
const {
  crudController,
  currentUser,
  currentAdmin,
  checkout,
  getSummary,
  deleteCart,
  saveAddress,
  createCoupon,
  listCoupons,
  removeCoupon,
  checkCoupon,
} = require("../controllers/auth.js");

const authCheck = require("../middlewares/authCheck.js");
RRR.route("/create-or-update-user").post(authCheck, crudController);
RRR.route("/current-user").get(authCheck, currentUser);
RRR.route("/current-admin").get(authCheck, currentAdmin, currentUser);
RRR.route("/user/cart").post(authCheck, checkout);
RRR.route("/user/checkout").get(authCheck, getSummary);
RRR.route("/user/cart").delete(authCheck, deleteCart);
RRR.route("/user/save-address").post(authCheck, saveAddress);
RRR.route("/coupon/create").post(authCheck, currentAdmin, createCoupon);
RRR.route("/coupons/list").get(listCoupons);
RRR.route("/coupon/remove/:id").delete(authCheck, currentAdmin, removeCoupon);
RRR.route("/coupon/check").post(authCheck, checkCoupon);
module.exports = RRR;
