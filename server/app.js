const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.use(morgan("dev"));
dotenv.config();

const DB = process.env.MONGO_CONNECT_SRV.replace(
  "<password>",
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => console.log("Connection Succesful!"))
  .catch((err) => {
    console.log(err);
    console.log("Cannot Connect to DataBase!");
  });
require("./models/Product.js");
const rate = rateLimit({
  max: 1000,
  windowMs: 30 * 60 * 1000,
  message: "Too many requests! Please try after 30 Minutes.!",
});
app.use(
  hpp({
    whitelist: ["sort", "page", "limit"],
  })
);
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
app.use(rate);
//IMPORTING ROUTES HERE ONLY
const AUTH = require("./routes/auth.js");
const CATEG = require("./routes/category.js");
const SUB = require("./routes/subcategory.js");
const PROD = require("./routes/product.js");
const IMG = require("./routes/image.js");
const ORD = require("./routes/order.js");
//IMPORTING ROUTES COMPLETES HERE

//CALLING ENDPOINTS HERE
app.use("/api/v1", AUTH);
app.use("/api/v1", CATEG);
app.use("/api/v1", SUB);
app.use("/api/v1", PROD);
app.use("/api/v1", IMG);
app.use("/api/v1", ORD);
//CALLING ENDPOINTS COMPLETED HERE
module.exports = app;
