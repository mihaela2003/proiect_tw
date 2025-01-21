 const AttendanceDB = require("../models").Attendance;
 const { attendance } = require("../models");
 const EventController = require("./events");
 const EventsDB = require("../models").Event;

 const { Op } = require('sequelize');
 const createCsvWriter = require("csv-writer").createObjectCsvWriter;
 const path = require("path");

 const controller = {
     addAttendance: async (req, res) => {
      console.log(req.body);
         const attendance = { 
            userId: req.body.userId,
            checkInTime: req.body.checkInTime,
            eventId: req.body.eventId }


         let errors = {};
         if (Object.keys(errors).length === 0) {
          AttendanceDB.create(attendance)
              .then(() => {
                  res.status(201).send({
                      message: "Attendance added successfully!"
                  });
              })
              .catch(() => {
                 res.status(500).send({ message: "Server error!" });
              });
      } else {
          res.status(400).send(errors);
      }
       },

       getAllAttendances: async (req, res) => {
         try {
           const id = req.params.id;
    
           const attendances = await AttendanceDB.findAll({
             where: {
               eventEventId: id,
             },
           });
    
           const csvWriter = createCsvWriter({
             path: path.join(__dirname, "attendances.csv"),
             header: [
               { id: "id", title: "Attendance ID" },
               { id: "userUserId", title: "User ID" },
               { id: "checkInTime", title: "Check-in Time" },
             ],
           });
    
           csvWriter.writeRecords(attendances).then(() => {
             res.attachment("attendances.csv");
             res.sendFile(path.join(__dirname, "attendances.csv")); 
           });
         } catch (error) {
           console.error("Error:", error);
           res.status(500).send({ message: "Server error" });
         }
       },
       getAllAttendancesList: async (req, res) => {
        AttendanceDB.findAll()
             .then(attendances => res.status(200).send(attendances))
             .catch(err => res.status(500).send(err));
        
      },    
 };

 module.exports = controller;


