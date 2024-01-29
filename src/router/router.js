const express = require("express");
const cors=require("cors");
const router = express.Router();
const controller = require("../controller/studentcontroller");
const logincontroller = require("../controller/logincontroller");
const auth = require("../middleware/authmiddlware");

router.get("/getstudents", controller.getstudent);
router.post("/addstudent", controller.addstudent);
router.put("/updatestudent/:id", controller.updatestudent);
router.delete("/deletestudent/:id", controller.deletestudent);
router.post("/getlogindata", logincontroller.loginuser);

router.get("/getdata", auth, async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Token Validate And Data Has Fetching..." });
  } catch (e) {
    res.status(400).json({ e: e });
  }
});

module.exports = router;
