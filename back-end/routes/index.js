const express = require("express");
const router = express.Router();
const AttendanceRouter = require("./attendance");
const EventRouter = require("./events");
const GroupRouter = require("./groups");
const UserRouter = require("./users");


router.use("/attendance", AttendanceRouter);
router.use("/events", EventRouter);
router.use("/groups", GroupRouter);
router.use("/users", UserRouter);

module.exports = router;