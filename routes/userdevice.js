const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { assignDeviceToUser } = require("../controllers/userdevice");

// POST request to assign a device to a user
router.post("/assignDevice", authenticateToken, assignDeviceToUser);

module.exports = router;
