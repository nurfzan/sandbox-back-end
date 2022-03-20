const express = require("express");
const router = express.Router();

const registerUser = require("./register.userController");
const loginUser = require("./login.userController");

router.post("/register", registerUser.service);
router.post("/login", loginUser.service);

module.exports = router;
