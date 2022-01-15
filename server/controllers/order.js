var uniqid = require("uniqid");
const User = require("../models/User.js");
const Order = require("../models/Order.js");
const Product = require("../models/Product");
const createOrder = async (req, res) => {
  try {
    //get the user first
    const getUser = await User.findOne({ email: req.user.email });

    //get the products also  :
    let prod = [];
    for (let i = 0; i < req.body.products.length; i++) {
      //lets update the product model by decreasing the stock qty.
      //get the product individual first
      const individualProduct = await Product.findOne({
        _id: req.body.products[i].product,
      });
      //increase the sold ad decrease the quantity........
      const updatedQuantity =
        individualProduct.quantity - req.body.products[i].count;
      const updatedSold = individualProduct.sold + req.body.products[i].count;
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: req.body.products[i].product,
        },
        { quantity: updatedQuantity, sold: updatedSold },
        { new: true }
      );
      const prodIndividual = {
        product: req.body.products[i].product,
        color: req.body.products[i].color,
        count: req.body.products[i].count,
      };
      prod.push(prodIndividual);
    }

    //lets form an object for the order   :
    const serviceObject = {
      serviceId: uniqid(),
      dateOfOrder: Date.now(),
      totalAmount: req.body.cartTotal,
      discountedAmount: req.body.discountedPrice,
      orderedBy: getUser._id,
      mode: "CASH ON DELIVERY",
      products: prod,
    };
    //now we need to order item ..........
    let createdObject = new Order(serviceObject);
    createdObject = await createdObject.save();

    res.status(201).json(createdObject);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getOrders = async (req, res) => {
  try {
    //get the user details................................................................
    const getUser = await User.findOne({ email: req.user.email });
    //get the orders from the model with id of user.........
    const orders = await Order.find({ orderedBy: getUser._id })
      .populate("products.product")
      .sort({
        dateOfOrder: "desc",
      });

    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAdminOrders = async (req, res) => {
  //
  try {
    //get all the orders from the orders db........
    const allOrders = await Order.find({})
      .populate("orderedBy")
      .populate("products.product")
      .sort({ dateOfOrder: "asc" });
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(400).json(error);
  }
};
const modifyStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    //update the order status
    const result = await Order.findOneAndUpdate(
      { _id: orderId },
      { status },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = { createOrder, getOrders, getAdminOrders, modifyStatus };
