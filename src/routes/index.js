const express = require("express");
const router = express.Router();
const classRoutes = require("../controllers/classes/routes");
const userRoutes = require("../controllers/users/routes");

router.use("/class", classRoutes);
router.use("/user", userRoutes);

module.exports = router;
