const CategoryModel = require("../models/Category.js");
const SubCategory = require("../models/SubCategory.js");
const slugify = require("slugify");
const create = async (req, res, next) => {
  //
  try {
    const result = new CategoryModel({
      name: req.body.category,
      slug: slugify(req.body.category),
    });
    const createdResult = await result.save();
    res.status(202).json({
      success: true,
      message: "Category updated successfully",
      data: {
        createdResult,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Category Already Exists",
      error_code: 400,
      data: {},
    });
  }
};
const read = async (req, res, next) => {
  //
  try {
    const result = await CategoryModel.findOne({ slug: req.params.slug });
    if (result == null) {
      res.status(200).json({
        success: true,
        message: "Category Fetched Successfully",
        length: 0,
        data: {},
      });
    } else {
      result.__v = undefined;
      res.status(200).json({
        success: true,
        message: "Category Fetched Successfully",
        length: 1,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Category could not be Fetched, Try Again",
      error_code: 400,
      data: {},
    });
  }
};
const update = async (req, res, next) => {
  try {
    const body = req.body.category;
    const existingData = await CategoryModel.findOneAndUpdate(
      { slug: req.params.slug },
      { name: body, slug: slugify(body) },
      { new: true }
    );
    existingData.__v = undefined;
    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      length: 1,
      data: existingData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Category not Found or Internal Error. Please Try Again",
      error_code: 400,
      data: {},
    });
  }
};
const del = async (req, res, next) => {
  try {
    const tag = req.params.slug;
    const deleteTask = await CategoryModel.deleteOne({ slug: tag });
    if (deleteTask.deletedCount === 0) {
      throw "Category Not Present";
    }
    return res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
      error_code: 400,
    });
  }
};
const list = async (req, res, next) => {
  try {
    const result = await CategoryModel.find({}).sort({ slug: -1 });
    //result is soft copy
    let i = 0;
    for (i = 0; i < result.length; i++) {
      const object = result[i];
      object.__v = undefined;
    }
    return res.status(200).json({
      success: true,
      message: "Categories Fetched Successfully",
      data: {
        length: result.length,
        categories: result,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
      data: {},
    });
  }
};

const subsFromCateg = async (req, res) => {
  const parentId = req.params.categoryId;

  try {
    //search for the subcategories model
    const fetched = await SubCategory.find({ parent: parentId });
    res.status(200).json({
      success: true,
      message: "SubCategories Fetched Successfully",
      data: {
        length: fetched.length,
        subcategories: fetched,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unexpected Error",
      error_code: 400,
      data: {},
    });
  }
};
const object = { create, read, update, del, list, subsFromCateg };
module.exports = object;
