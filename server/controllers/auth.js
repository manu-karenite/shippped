const User = require("../models/User.js");
const Cart = require("../models/Cart.js");
const Coupon = require("../models/Coupon.js");
const crudController = async (req, res, next) => {
  //we have the user in req.user;
  const name = req.user.name;
  const email = req.user.email;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(202).json({
      success: true,
      message: "Record Updated Succesfully",
      data: userExists,
    });
  }

  const createUser = new User({
    name,
    email,
  });
  const submitUser = await createUser.save();

  res.status(201).json({
    success: true,
    message: "Record Created Succesfully",
    data: submitUser,
  });
};

const currentUser = async (req, res) => {
  try {
    const result = await User.findOne({ email: req.user.email });
    res.status(200).json({
      success: true,
      message: "User Retrieved Succesfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
};

const currentAdmin = async (req, res, next) => {
  const result = await User.findOne({ email: req.user.email });
  if (result.role != "Admin") {
    return res.status(403).json({
      success: false,
      error_code: 403,
      message: "Route restricted for Admin only",
      data: {},
    });
  }
  next();
};
const checkout = async (req, res) => {
  try {
    const fetchUser = await User.findOne({ email: req.user.email });
    const toBackend = req.body;
    let finalObject = [];
    let total = 0;
    for (let i = 0; i < toBackend.length; i++) {
      //toBackend[i] is the individual cartTotal
      let temp = {
        product: toBackend[i]._id,
        count: toBackend[i].count,
        color: toBackend[i].color,
        price: toBackend[i].price,
      };
      total += toBackend[i].price * toBackend[i].count;
      finalObject.push(temp);
    }
    const serviceObject = {
      products: finalObject,
      cartTotal: total,
      discountedPrice: total,
      orderedBy: fetchUser._id,
    };
    //find if we have one ? or not ?
    const ifAlreadyExists = await Cart.findOne({ orderedBy: fetchUser._id });
    if (ifAlreadyExists) {
      //delete first itself , so creation would be easy
      const deleteCart = await Cart.deleteOne({ orderedBy: fetchUser._id });
    }
    const newlyCreatedCart = new Cart(serviceObject);
    const submitCart = await newlyCreatedCart.save();
    res.status(201).json({
      success: true,
      message: "Cart Handled Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
const getSummary = async (req, res) => {
  try {
    //get the user from req.headers;
    //GET THE USER FROM USER MODEL FOR USER.ID
    const getUser = await User.findOne({ email: req.user.email });
    //GET THE ITEMS FROM CART BY USER import {  } from 'module';
    const userCart = await Cart.findOne({ orderedBy: getUser._id }).exec();

    res.status(200).json(userCart);
  } catch (error) {
    res.status(404).json(error);
  }
};
const deleteCart = async (req, res) => {
  try {
    const getUser = await User.findOne({ email: req.user.email });
    //from the cart delete the cart item which has same orderedBy as user
    const deleteCart = await Cart.deleteOne({ orderedBy: getUser._id });
    res.status(210).json("Ok");
  } catch (error) {
    res.status(400).json(error);
  }
};
const saveAddress = async (req, res) => {
  try {
    const userDB = await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address },
      { new: true }
    );
    res.status(202).json("okay");
  } catch (error) {
    res.status(400).json(error);
  }
};
const createCoupon = async (req, res) => {
  //

  const { name, expiry, discount } = req.body;
  try {
    const result = new Coupon({
      name,
      expiry,
      discount,
    });
    const submitResult = await result.save();
    res.status(201).json(submitResult);
  } catch (error) {
    res.status(400).json(error);
  }
};
const listCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.status(201).json(coupons);
  } catch (error) {
    res.status(400).json(error);
  }
};
const removeCoupon = async (req, res) => {
  try {
    const result = await Coupon.deleteOne({ _id: req.params.id });
    return res.status(210).json("Deleted");
  } catch (error) {
    return res.status(400).json(error);
  }
};
const checkCoupon = async (req, res) => {
  try {
    //get the User first from DB
    const userActive = await User.findOne({ email: req.user.email });
    //get the coupon from req.body
    const couponToVerify = req.body.couponName.toUpperCase();
    //find whetehr such coupon exists or not
    const couponExists = await Coupon.findOne({ name: couponToVerify });
    //return error if no coupon exists
    if (couponExists === null) {
      return res.status(404).json({
        message: "Coupon Not Found",
      });
    }

    //now we have the coupon , we get the cart of user for checkout and
    const cartOfUser = await Cart.findOne({ orderedBy: userActive._id });
    //we calculate the discountPrice
    const discountedPrice = (
      ((100 - couponExists.discount).toFixed(2) * cartOfUser.cartTotal).toFixed(
        2
      ) / 100
    ).toFixed(2);
    //now we need to update the Discounted Price in Cart Model    to reflect changes in the DB
    const updatedCart = await Cart.findOneAndUpdate(
      {
        orderedBy: userActive._id,
      },
      { discountedPrice },
      { new: true }
    );
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(error);
  }
};
const object = {
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
};
module.exports = object;
