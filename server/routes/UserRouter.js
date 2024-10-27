const express = require("express");
const {
    loginUser,
    registerUser,
    getCurrentUserTitle,
} = require("../controllers/user.controller.js");
const authenticateToken = require("../middleware/auth.js");

const UserRouter = express.Router();
UserRouter.post("/login", loginUser);
UserRouter.post("/register", registerUser);
UserRouter.get("/current", authenticateToken, getCurrentUserTitle);
module.exports = UserRouter;
