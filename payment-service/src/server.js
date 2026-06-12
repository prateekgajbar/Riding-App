require("dotenv").config();

const express = require("express");

const app = express();

const paymentRoutes =
  require("./routes/paymentRoutes");

const {
  createPaymentTable
} = require("./models/paymentModel");

app.use(express.json());

app.use("/api/payments", paymentRoutes);

app.get("/health", (req, res) => {
  res.json({
    service: "payment-service",
    status: "UP",
  });
});

const PORT = process.env.PORT || 8085;

app.listen(PORT, async () => {
  try {
    await createPaymentTable();

    console.log(
      `Payment Service running on ${PORT}`
    );

  } catch (err) {
    console.error(err);
  }
});
