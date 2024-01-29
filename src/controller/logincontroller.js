const pool = require("../model/studentmodel");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const { json } = require("express");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.loginuser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { uname, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM userdata WHERE uname=$1 AND password=$2",
      [uname, password]
    );
    if (user.rows.length > 0) {
      const authtoken = jwt.sign(
        { uname: user.rows[0].uname, id: user.rows[0].id },
        SECRET_KEY
      );
      res.status(200).send({ message: "User Logged In Success" });
      console.log(authtoken);
    } else {
      return res.json({ errors: "Inavaild Emaild Or Password" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
