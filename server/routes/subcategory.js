const express = require("express");
const SubCategoryRouter = express.Router();
const {
  create,
  read,
  update,
  del,
  list,
} = require("../controllers/subcategory.js");

const authCheck = require("../middlewares/authCheck.js");
const { currentAdmin } = require("../controllers/auth.js");
//reading a particvular category
SubCategoryRouter.route("/subcategory/:slug").get(read);
//posting a new category
SubCategoryRouter.route("/subcategory").post(authCheck, currentAdmin, create);
//deleting a category
SubCategoryRouter.route("/subcategory/:slug").delete(
  authCheck,
  currentAdmin,
  del
);
//updating a category
SubCategoryRouter.route("/subcategory/:slug").put(
  authCheck,
  currentAdmin,
  update
);
//reading list of categories
SubCategoryRouter.route("/subcategories").get(list);
module.exports = SubCategoryRouter;
