const SubCategoryModel = require("../models/SubCategory.js");
const slugify = require("slugify");
const create = async (req, res, next) => {
  //

  try {
    const result = new SubCategoryModel({
      name: req.body.subcategory,
      slug: slugify(req.body.subcategory),
      parent: req.body.parent,
    });
    const createdResult = await result.save();
    res.status(202).json({
      success: true,
      message: "Subcategory Created successfully",
      data: {
        createdResult,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "SubCategory Already Exists",
      error_code: 400,
      data: {},
    });
  }
};
const read = async (req, res, next) => {
  //
  try {
    const result = await SubCategoryModel.findOne({ slug: req.params.slug });
    if (result == null) {
      res.status(200).json({
        success: true,
        message: "SubCategory Fetched Successfully",
        length: 0,
        data: {},
      });
    } else {
      result.__v = undefined;
      res.status(200).json({
        success: true,
        message: "SubCategory Fetched Successfully",
        length: 1,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "SubCategory could not be Fetched, Try Again",
      error_code: 400,
      data: {},
    });
  }
};
const update = async (req, res, next) => {
  try {
    const body = req.body.subcategory;
    const existingData = await SubCategoryModel.findOneAndUpdate(
      { slug: req.params.slug },
      { name: body, slug: slugify(body) },
      { new: true }
    );
    existingData.__v = undefined;
    res.status(200).json({
      success: true,
      message: "SubCategory Updated Successfully",
      length: 1,
      data: existingData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "SubCategory not Found or Internal Error. Please Try Again",
      error_code: 400,
      data: {},
    });
  }
};
const del = async (req, res, next) => {
  try {
    const tag = req.params.slug;
    const deleteTask = await SubCategoryModel.deleteOne({ slug: tag });
    if (deleteTask.deletedCount === 0) {
      throw "Category Not Present";
    }
    return res.status(200).json({
      success: true,
      message: "SubCategory Deleted Successfully",
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
    const result = await SubCategoryModel.find({}).sort({ slug: -1 });
    //result is soft copy
    let i = 0;
    for (i = 0; i < result.length; i++) {
      const object = result[i];
      object.__v = undefined;
    }
    return res.status(200).json({
      success: true,
      message: "SubCategories Fetched Successfully",
      data: {
        length: result.length,
        subcategory: result,
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

const object = { create, read, update, del, list };
module.exports = object;
