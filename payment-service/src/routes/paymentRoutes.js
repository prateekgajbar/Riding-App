const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createPayment,
  getPayments
} = require("../controllers/paymentController");

router.post(
  "/pay",
  authMiddleware,
  createPayment
);

router.get(
  "/history",
  authMiddleware,
  getPayments
);

module.exports = router;
