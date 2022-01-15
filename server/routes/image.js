const express = require("express");
const ImageRouter = express.Router();

const authCheck = require("../middlewares/authCheck.js");
const { currentAdmin } = require("../controllers/auth.js");
const { upload, remove } = require("../controllers/image.js");

ImageRouter.route("/upload-images").post(authCheck, currentAdmin, upload);
ImageRouter.route("/destroy-image").post(authCheck, currentAdmin, remove);

module.exports = ImageRouter;
