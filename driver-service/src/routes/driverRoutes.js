const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  registerDriver,
  getDriver,
  updateStatus
} = require("../controllers/driverController");

router.post(
  "/register",
  authMiddleware,
  registerDriver
);

router.get(
  "/profile",
  authMiddleware,
  getDriver
);

router.put(
  "/status",
  authMiddleware,
  updateStatus
);

module.exports = router;
