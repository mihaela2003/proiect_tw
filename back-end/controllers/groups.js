 const GroupsDB = require("../models").Group;

 const controller = {
     addGroup: async (req, res) => {
        console.log('Received data:', req.body);
         const group = {
             groupName : req.body.groupName,
             userId : req.body.userId
         };
         console.log('group: ', group);

         let errors = {};
         if (!group.groupName) {
            errors.name = "Group name is required.";
          }
          
          if (!group.userId) {
            errors.userId = "User ID is required.";
          }
          

         if (Object.keys(errors).length === 0) {
             GroupsDB.create(group)
                 .then(() => {
                     res.status(201).send({
                         message: "Group added successfully!"
                     });
                 })
                 .catch(() => {
                     res.status(500).send({ message: "Server error!" });
                 });
         } else {
             res.status(400).send(errors);
         }
     },

     getAllGroups: async (req, res) => {
         GroupsDB.findAll()
             .then(groups => res.status(200).send(groups))
             .catch(err => res.status(500).send(err));
     },

     getGroupById: async (req, res) => {
         GroupsDB.findByPk(req.params.id)
             .then(groups => res.status(200).send(groups))
             .catch(err => res.status(500).send(err));
     },
     getGroupByName: async (req, res) => {
        try {
          const { name } = req.query; 
          if (!name) {
            return res.status(400).send({ message: "No 'name' query parameter provided." });
          }
    
          const group = await GroupsDB.findOne({ where: { groupName: name } });
          if (!group) {
            return res.status(404).send({ message: "Group not found." });
          }

          return res.status(200).send(group);
        } catch (error) {
          console.error(error);
          return res.status(500).send({ message: "Server error while fetching group by name." });
        }
      },
 }

 module.exports = controller;


