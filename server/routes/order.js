const express = require("express");
const orderRouter = express.Router();

const authCheck = require("../middlewares/authCheck.js");
const { currentAdmin } = require("../controllers/auth.js");
const {
  createOrder,
  getOrders,
  getAdminOrders,
  modifyStatus,
} = require("../controllers/order.js");

//endpoint to create an Order
orderRouter.route("/order").post(authCheck, createOrder);
orderRouter.route("/orders").get(authCheck, getOrders);
orderRouter.route("/admin/orders").get(authCheck, currentAdmin, getAdminOrders);
orderRouter.route("/admin/orders").put(authCheck, currentAdmin, modifyStatus);

module.exports = orderRouter;
