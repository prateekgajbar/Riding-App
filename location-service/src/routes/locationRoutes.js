const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  updateLocation,
  getLocation
} = require("../controllers/locationController");

router.post(
  "/update",
  authMiddleware,
  updateLocation
);

router.get(
  "/:userId",
  authMiddleware,
  getLocation
);

module.exports = router;
