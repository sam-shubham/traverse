var jwt = require("jsonwebtoken");
// import publicKEY from "./tokenKeys/publicKEY";
const verifyauth = (req, res, next) => {
  var authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization) {
    res.send({ success: false, msg: "Please Login To Access" });
    return;
  }
  if (
    authorization.includes(" ") &&
    (authorization.includes("bearer") || authorization.includes("Bearer"))
  ) {
    authorization = authorization.split(" ")[1];
  }
  var token = authorization;
  var verifyOptions = {
    issuer: process.env.Issuer,
    subject: process.env.Subject,
    audience: process.env.Audience,
    // algorithm: ["RS256"],
  };
  // var publicKEY = `${process.env.publicKEY}`;
  try {
    var legit = jwt.verify(
      token,
      "websitepasswordProtected-AppAmbient",
      verifyOptions
    );
    req.user = legit._id;
    next();
  } catch {
    res.send({ Error: "Please login to purchase" });
  }
};

module.exports = verifyauth;
