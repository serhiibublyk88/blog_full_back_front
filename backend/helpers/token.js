const jwt = require("jsonwebtoken");

const sign = process.env.JWT_SECRET || "default_secret";

module.exports = {
  generate(data) {
    return jwt.sign(data, sign, { expiresIn: "30d" });
  },
  verify(token) {
    return jwt.verify(token, sign);
  },
};
