const { response } = require("../helpers/common");
const jwt = require("jsonwebtoken");

let key = process.env.JWT_KEY;

const seller = (req, res, next) => {
  let token;
  let auth = req.headers.authorization;
  token = auth.split(" ")[1];
  let decode = jwt.verify(token, key);
  let dataRole = decode.role;
  console.log("role", dataRole);
  if (dataRole !== "seller") {
    return response(res, 404, false, null, "Role is not seller");
  }
  return next();
};

const customer = (req, res, next) => {
  let token;
  let auth = req.headers.authorization;
  token = auth.split(" ")[1];
  let decode = jwt.verify(token, key);
  let dataRole = decode.role;
  console.log("role", dataRole);
  if (dataRole !== "admin") {
    return response(res, 404, false, null, "Role is not customer");
  }
  return next();
};

const protect = (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization) {
      let auth = req.headers.authorization;
      token = auth.split(" ")[1];
      let decode = jwt.verify(token, key);
      req.payload = decode;
      next();
    } else {
      return response(res, 404, false, null, "Server need token");
    }
  } catch (err) {
    console.log("error", err);
    if (err && err.name == "JsonWebTokenError") {
      return response(res, 404, false, null, "Invalid token");
    } else if (err && err.name == "TokenExpiredError") {
      return response(res, 404, false, null, "Expired token");
    } else {
      return response(res, 404, false, null, "Token is not active");
    }
  }
};

module.exports = {
  seller,
  customer,
  protect,
};
