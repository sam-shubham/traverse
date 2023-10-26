var jwt = require("jsonwebtoken");
// import privateKEY from "./tokenKeys/privateKEY";

var cratetoken = (DataToEncToken) => {
  // var privateKEY = `${process.env.privateKEY}`;
  // console.log(privateKEY);
  // SIGNING OPTIONS
  var signOptions = {
    issuer: process.env.Issuer,
    subject: process.env.Subject,
    audience: process.env.Audience, // Audience
    // expiresIn: "12h",
    // algorithm: "RS256",
  };
  var token = jwt.sign(
    DataToEncToken,
    "websitepasswordProtected-AppAmbient",
    signOptions
  );
  return token;
};

module.exports = cratetoken;
