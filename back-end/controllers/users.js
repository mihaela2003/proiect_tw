 const UsersDB = require("../models").User;
 const EventsDB = require("../models").Event;
 const bcryptjs = require("bcryptjs")
 const jwt = require("jsonwebtoken")

 const controller = {
     addUser: async (req, res) => {
        
         const user = {
             name: req.body.name,
             email: req.body.email,
             password: req.body.password,
         };

         try {
             user.password = await bcryptjs.hash(user.password, 10);
         } catch (err) {
             console.log(err)
         }
         let errors = {};

         if (Object.keys(errors).length === 0) {
             UsersDB.create(user)
                 .then(() => {
                     res.status(201).send({
                         message: "User added successfully!"
                     });
                 })
                 .catch(() => {
                     res.status(500).send({ message: "Server error!" });
                 });
         } else {
             res.status(400).send(errors);
         }
     },

     getAllUsers: async (req, res) => {
         UsersDB.findAll()
             .then(users => res.status(200).send(users))
             .catch(err => res.status(500).send(err));
     },

     getUserById: async (req, res) => {
         UsersDB.findByPk(req.params.id)
             .then(users => res.status(200).send(users))
             .catch(err => res.status(500).send(err));
     },

     makeAdmin: async (req, res) => {
         try {
           const user = await UsersDB.findByPk(req.params.id);
      
           if (!user) {
             return res.status(400).send("You are not logged in!");
           } else {
             user.isAdmin = true;
             await user.save();
      
             return res.status(200).send(user);
           }
         } catch (error) {
           console.error('Error making admin:', error);
           return res.status(500).send('Internal Server Error');
         }
       },      

     login: async (req, res) => {
         UsersDB.findOne({ where: { email: req.body.email } })
             .then((users) => {
                 if (users === null) {
                     res.status(401).send({
                         message: "There is no account associated to this email address!",
                     });
                 } else {
                     bcryptjs.compare(
                         req.body.password,
                         users.password,
                         function (err, result) {
                             if (result) {
                                 const token = jwt.sign(
                                     {
                                         email: users.email,
                                         userId: users.userId,
                                     },
                                     "secret",
                                     function (err, token) {
                                         res.cookie("jwt", token, {httpOnly:true})
                                         res.status(200).send({
                                             message:
                                                 "Logged in succesfully!",
                                             token: token,
                                             user: users,
                                         });
                                     }
                                 );
                             } else {
                                 res.status(401).send({
                                     message: "This account doesn't exist!",
                                 });
                             }
                         }
                     );
                 }
             })
             .catch((error) => {
                 console.log(error.message);
                 res.status(500).send({
                     message: "Server error!",
                 });
             });
     },

     getCurrentUser: async (req, res) => {
         console.log(req.headers.authorization)
         const token = req.headers.authorization;
        
         if (!token) {
             return res.status(401).send("No token provided");
         }
    
         jwt.verify(token, "secret", (err, decoded) => {
             if (err) {
                return res.status(401).send("Invalid token");
             }
    
             const userId = decoded.userId;
             UsersDB.findByPk(userId)
                 .then((user) => {
                     if (!user) {
                         return res.status(404).send("User not found");
                     }
                     return res.status(200).json(user);
                 })
                 .catch((error) => {
                     console.log(error.message);
                     return res.status(500).send("Server error");
                 });
         });
     },

   
    logout: (req, res) => {
        if (req.session) {
          req.session.destroy((err) => {
            if (err) {
              console.error('Failed to destroy session:', err);
              return res.status(500).send('Failed to log out');
            } else {
              res.clearCookie('connect.sid'); 
              res.status(200).send("You've been logged out");
            }
          });
        } else {
          res.status(400).send('No session to log out');
        }
    },
 }
 module.exports = controller;


