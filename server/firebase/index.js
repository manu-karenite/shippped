var admin = require("firebase-admin");

//import serviceAccount from "json!../config/fbSvcAcctKey.json";
// var serviceAccount = require("../config/fbSvcAcctKey.json");
const serviceAccount = require("../config/fbSvcAcctKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
