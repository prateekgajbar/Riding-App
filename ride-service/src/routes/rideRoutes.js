const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createRide,
  acceptRide,
  startRide,
  completeRide,
  getRideHistory
} = require("../controllers/rideController");

router.post(
  "/create",
  authMiddleware,
  createRide
);

router.put(
  "/accept/:rideId",
  authMiddleware,
  acceptRide
);

router.put(
  "/start/:rideId",
  authMiddleware,
  startRide
);

router.put(
  "/complete/:rideId",
  authMiddleware,
  completeRide
);

router.get(
  "/history",
  authMiddleware,
  getRideHistory
);

module.exports = router;
