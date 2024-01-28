const pool = require("../model/studentmodel");
const pg = require("../model/studentmodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
exports.loginuser = async (req, res) => {
  try {
    const { uname, password } = req.body;
    const user = await pool.query(
      "select * from userdata where uname=$1 and password=$2",
      [uname, password]
    );
    if (user.rows.length > 0) {
      const authtoken = jwt.sign({uname:user.uname,id:user.id}, SECRET_KEY);
      console.log(authtoken);
      res.status(200).json({ message: "User Exists", authtoken: authtoken });
    } else {
      res.status(400).json({ message: "Invaild username or password" });
    }
  } catch (e) {
    res.status(400).json({ e: e });
  }
};
