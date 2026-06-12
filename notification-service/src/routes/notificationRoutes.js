const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  sendNotification,
  getNotifications
} = require("../controllers/notificationController");

router.post(
  "/send",
  authMiddleware,
  sendNotification
);

router.get(
  "/history",
  authMiddleware,
  getNotifications
);

module.exports = router;
