const express = require("express");
const router = express.Router();
const eventsController = require("../controllers").event;

router.post("/addEvent",eventsController.addEvent);
router.get("/getAllEvents",eventsController.getAllEvents);
router.get("/getEventById/:id",eventsController.getEventById);
router.get("/getAllEventsByGroup/:id",eventsController.getAllEventsByGroup);

module.exports = router;
