const express = require("express");
const router = express.Router();
const controller = require("../controller/studentcontroller");

router.get("/getstudents", controller.getstudent);
router.post("/addstudent",controller.addstudent);
router.put("/updatestudent/:id",controller.updatestudent);
router.delete("/deletestudent/:id",controller.deletestudent)

module.exports = router;
