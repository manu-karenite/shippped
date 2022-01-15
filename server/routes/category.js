const express = require("express");
const CategoryRouter = express.Router();
const {
  create,
  read,
  update,
  del,
  list,
  subsFromCateg,
} = require("../controllers/categories.js");

const authCheck = require("../middlewares/authCheck.js");
const { currentAdmin } = require("../controllers/auth.js");
//reading a particvular category
CategoryRouter.route("/category/:slug").get(read);
//posting a new category
CategoryRouter.route("/category").post(authCheck, currentAdmin, create);
//deleting a category
CategoryRouter.route("/category/:slug").delete(authCheck, currentAdmin, del);
//updating a category
CategoryRouter.route("/category/:slug").put(authCheck, currentAdmin, update);
//reading list of categories
CategoryRouter.route("/categories").get(list);
//for getting subs according to a category
CategoryRouter.route("/category/subcategories/:categoryId").get(subsFromCateg);
module.exports = CategoryRouter;
