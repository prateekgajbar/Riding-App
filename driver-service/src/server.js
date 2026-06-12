require("dotenv").config();

const express = require("express");

const app = express();

const driverRoutes =
  require("./routes/driverRoutes");

const {
  createDriverTable
} = require("./models/driverModel");

app.use(express.json());

app.use("/api/drivers", driverRoutes);

app.get("/health", (req, res) => {
  res.json({
    service: "driver-service",
    status: "UP"
  });
});

const PORT = process.env.PORT || 8083;

app.listen(PORT, async () => {
  try {
    await createDriverTable();

    console.log(
      `Driver Service running on ${PORT}`
    );
  } catch (err) {
    console.error(err);
  }
});
