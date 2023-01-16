const jwt = require("jsonwebtoken");

let key = process.env.JWT_KEY;

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, key, verifyOpts);
  return token;
};

const generateRefreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, key, verifyOpts);
  return token;
};

const decodeToken = (token) => {
  var decoded = jwt.verify(token, key);
  return decoded;
};

module.exports = {
  generateToken,
  generateRefreshToken,
  decodeToken,
};
