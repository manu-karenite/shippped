const admin = require("../firebase/index.js");

const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await admin.auth().verifyIdToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid or Expired Credentials",
      error_code: 401,
      data: {},
    });
  }
};
module.exports = authCheck;
