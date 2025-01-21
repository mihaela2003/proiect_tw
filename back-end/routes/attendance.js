const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers").attendance;

router.post("/addAttendance/:code",attendanceController.addAttendance);
router.get("/getAllAttendances/:id", attendanceController.getAllAttendances);
router.get("/getAllAttendancesList", attendanceController.getAllAttendancesList);
module.exports = router;
