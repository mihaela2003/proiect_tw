 const events = require("../models/events");

 const EventsDB = require("../models").Event;
 const sequelize = require("../config/db");

 const controller = {
     addEvent: async (req, res) => {
        console.log("Received event:", req.body); 
         const event = {
             name : req.body.name,
             code : req.body.code,
             startingTime : req.body.startingTime,
             endingTime : req.body.endingTime,
             isOpen: req.body.isOpen,
             groupId : req.body.groupId
         };

         let errors = {};
         if (Object.keys(errors).length === 0) {
             EventsDB.create(event)
                 .then(() => {
                     res.status(201).send({
                         message: "Event added successfully!"
                     });
                 })
                 .catch(() => {
                    res.status(500).send({ message: "Server error!" });
                 });
         } else {
             res.status(400).send(errors);
         }
     },

     getAllEvents: async (req, res) => {
         EventsDB.findAll()
             .then(events => res.status(200).send(events))
             .catch(err => res.status(500).send(err));
     },

     getEventById: async (req, res) => {
         EventsDB.findByPk(req.params.id)
             .then(events => res.status(200).send(events))
             .catch(err => res.status(500).send(err));
     },
     getAllEventsByGroup: async (req, res) => {
         const groupId = req.params.id;
    
         try {
             const events = await EventsDB.findAll({
                 where: { groupId: groupId }
             });
    
             res.status(200).send(events);
         } catch (err) {
             console.error(err);
             res.status(500).send(err);
         }
     },
 }


 module.exports = controller;


