const express = require("express");
const router = express.Router();
const controller = require("../controller/studentcontroller");
const logincontroller=require("../controller/logincontroller");
const auth=require("../middleware/authmiddlware");

router.get("/getstudents", controller.getstudent);
router.post("/addstudent", controller.addstudent);
router.put("/updatestudent/:id", controller.updatestudent);
router.delete("/deletestudent/:id", controller.deletestudent);
router.post("/getlogindata",logincontroller.loginuser);

module.exports = router;
