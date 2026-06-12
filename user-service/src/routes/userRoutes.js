const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getProfile,
  createProfile
} = require("../controllers/userController");

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.post(
  "/profile",
  authMiddleware,
  createProfile
);

module.exports = router;
