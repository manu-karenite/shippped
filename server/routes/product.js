const express = require("express");
const ProductRouter = express.Router();
const {
  create,
  listAll,
  deleteOne,
  getOneProduct,
  fetchProducts,
  getQuantity,
  productStar,
  productsFromCategories,
  productsFromSubCategories,
  addToWishlist,
  allWishlisted,
  deleteFromWishlist,
} = require("../controllers/product.js");

const authCheck = require("../middlewares/authCheck.js");
const { currentAdmin } = require("../controllers/auth.js");

//to create a product
ProductRouter.route("/product").post(authCheck, currentAdmin, create);
ProductRouter.route("/products/:count").get(listAll);
ProductRouter.route("/product/:slug").delete(
  authCheck,
  currentAdmin,
  deleteOne
);
ProductRouter.route("/product/:slug").get(getOneProduct);
ProductRouter.route("/products").post(fetchProducts);
ProductRouter.route("/products-total").get(getQuantity);
ProductRouter.route("/product/star/:productId").put(authCheck, productStar);
ProductRouter.route("/products/categories/:slug").get(productsFromCategories);
ProductRouter.route("/products/subcategories/:slug").get(
  productsFromSubCategories
);

ProductRouter.route("/user/wishlist").post(authCheck, addToWishlist);
ProductRouter.route("/user/wishlisted").get(authCheck, allWishlisted);
ProductRouter.route("/user/wishlist").delete(authCheck, deleteFromWishlist);

module.exports = ProductRouter;
