const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.id = user.id;
    } else {
      res.status(400).json({ message: "Unauthories user" });
    }
    next();
  } catch (e) {
    res.status(405).json({ message: "Something went wrong" });
  }
};

module.exports = auth;
