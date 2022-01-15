const ProductModel = require("../models/Product.js");
const UserModel = require("../models/User.js");
const SubCategory = require("../models/SubCategory.js");
const slugify = require("slugify");
var _ = require("lodash");
const { findOne } = require("../models/User.js");
const create = async (req, res, next) => {
  //step 1 : retrrieve all data first
  const objectData = {
    title: req.body.title,
    slug: slugify(req.body.title.toLowerCase()),
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    shipping: req.body.shipping,
    brand: req.body.brand,
    color: req.body.color,
    category: req.body.catId,
    subcategory: req.body.selectedSubCat,
    images: req.body.images,
  };

  try {
    //create a query object
    const query = new ProductModel(objectData);
    const result = await query.save();
    res.status(200).json({
      success: true,
      message: "Success",
      error_code: 200,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product Already Exists",
      error_code: 400,
      data: {},
    });
  }
};

const listAll = async (req, res) => {
  try {
    const result = await ProductModel.find({})
      .limit(+req.params.count)
      .populate("category")
      .populate("subcategory");

    res.status(200).json({
      success: true,
      message: "All Products have been fetched Successfully",
      data: {
        length: result.length,
        result,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "Products could not be Processed",
      data: {},
    });
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const result = await ProductModel.deleteOne({ slug: req.params.slug });
    if (result.deletedCount === 0) {
      throw "Item Not Found in the Inventory";
    }
    res.status(200).json({
      message: "Deleted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      success: false,
    });
  }
};

const getOneProduct = async (req, res, next) => {
  const slug = req.params.slug;
  //query the product model for such products
  const fromDB = await ProductModel.findOne({ slug })
    .populate("category")
    .populate("subcategory");
  res.status(200).json({
    message: fromDB,
  });
};
const fetchProducts = async (req, res) => {
  const { sort, order, page } = req.body;
  const pg = page || 1;
  const perPg = 3;

  let result = await ProductModel.find({})
    .populate("category")
    .populate("subcategory")
    .sort([[sort, order]])
    .skip((pg - 1) * perPg)
    .limit(perPg);
  return res.json({
    result,
  });
};

const getQuantity = async (req, res) => {
  try {
    const qty = await ProductModel.estimatedDocumentCount();
    res.status(200).json({
      quantity: qty,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const productStar = async (req, res) => {
  //finding the user
  try {
    //fetch product and user
    const fetchedProduct = await ProductModel.find({
      _id: req.params.productId,
    });
    const fetchedUser = await UserModel.find({ email: req.user.email });
    const { star } = req.body;

    //get for the existing ratings if any for the same user
    // console.log(fetchedProduct[0]);
    let existingRatingObject = fetchedProduct[0].ratings.find((curr) => {
      return curr.postedBy.toString() == fetchedUser[0]._id.toString();
    });
    // console.log("EXSITING OBJECT : ", existingRatingObject);

    if (existingRatingObject === undefined) {
      //we need to add the star rating in the given Array, we just need to push into the array
      let newlyCreatedObject = await ProductModel.findByIdAndUpdate(
        fetchedProduct[0]._id,
        {
          $push: { ratings: { star, postedBy: fetchedUser[0]._id } },
        },
        { new: true }
      );
      res.json(newlyCreatedObject);
      // console.log(fetchedProduct[0]);
    } else {
      const ratingUpdated = await ProductModel.updateOne(
        {
          ratings: { $elemMatch: existingRatingObject },
        },
        { $set: { "ratings.$.star": star } },
        { new: true }
      ).exec();
      // console.log(ratingUpdated);
      res.json(ratingUpdated);
    }
  } catch (error) {
    res.json(error);
  }
};

const productsFromCategories = async (req, res) => {
  try {
    //get all the products having the slug as the given slug
    let result = await ProductModel.find({})
      .populate("category")
      .populate("subcategory");
    result = result.filter((curr) => {
      return curr.category.slug === req.params.slug;
    });
    res.status(200).json({
      length: result.length,
      result,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
const productsFromSubCategories = async (req, res) => {
  try {
    //get all the products having the slug as the given slug
    let result = await ProductModel.find({})
      .populate("category")
      .populate("subcategory");
    //results is an array , having objects

    const filteredProducts = result.filter((curr) => {
      //curr is the curr product object
      //check whether its subcategories has any of the given subcategories
      let toReturn = false;
      for (let i = 0; i < curr.subcategory.length; i++) {
        if (curr.subcategory[i].slug === req.params.slug) {
          toReturn = true;
          break;
        }
      }
      return toReturn === true;
    });
    res.status(200).json({
      items: filteredProducts.length,
      products: filteredProducts,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
const addToWishlist = async (req, res) => {
  //
  try {
    const result = await UserModel.findOne({ email: req.user.email });
    //we have to insert the wishlist in the user model.......
    //get the upcoming wishlist.......
    const wishlist = result.wishlist;

    //IN THE WISHLIST , ADD THIS ...........
    wishlist.push(req.body.productId);
    //however it may contain two values, use lodash....
    const freshWishlist = _.uniqWith(wishlist, _.isEqual);
    const updatedWishlist = await UserModel.findOneAndUpdate(
      { email: req.user.email },
      { wishlist: freshWishlist },
      { new: true }
    );
    res.json("ok");
  } catch (error) {
    res.status(400).json(error);
  }
};
const allWishlisted = async (req, res) => {
  try {
    //get the user first.........

    const getUser = await UserModel.findOne({ email: req.user.email }).populate(
      "wishlist"
    );
    res.json(getUser.wishlist);
  } catch (error) {
    res.json("Failed");
  }
};
const deleteFromWishlist = async (req, res) => {
  try {
    const userLoggedIn = await UserModel.findOne({ email: req.user.email });
    //get its wishlist...........

    const userWishlist = userLoggedIn.wishlist;
    for (let i = 0; i < userWishlist.length; i++) {
      if (userWishlist[i].toString() === req.body.productId) {
        userWishlist.splice(i, 1);
        break;
      }
    }

    //now update the user............
    const updatedUser = await UserModel.findOneAndUpdate(
      {
        email: req.user.email,
      },
      { wishlist: userWishlist },
      { new: true }
    );

    res.json("Ok");
  } catch (error) {
    res.status(400).json(error);
  }
};

const object = {
  deleteFromWishlist,
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
};
module.exports = object;
