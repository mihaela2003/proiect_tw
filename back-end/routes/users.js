const express = require("express");
const router = express.Router();
const usersController = require("../controllers").user;

router.post("/addUser",usersController.addUser);
router.post("/login", usersController.login)
router.get("/getAllUsers",usersController.getAllUsers);
router.get("/getUserById/:id",usersController.getUserById);
router.post("/logout", usersController.logout);
router.put("/makeAdmin/:id", usersController.makeAdmin);
router.get("/getCurrentUser", usersController.getCurrentUser);
module.exports = router;