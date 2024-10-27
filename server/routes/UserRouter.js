const express = require("express");
const {
    loginUser,
    registerUser,
} = require("../controllers/user.controller.js");

const UserRouter = express.Router();
UserRouter.post("/login", loginUser);
UserRouter.post("/register", registerUser);

module.exports = UserRouter;
