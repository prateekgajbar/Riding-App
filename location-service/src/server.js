require("dotenv").config();

const express = require("express");

const app = express();

const locationRoutes =
require("./routes/locationRoutes");

const {
  createLocationTable
} = require("./models/locationModel");

app.use(express.json());

app.use(
  "/api/location",
  locationRoutes
);

app.get("/health", (req, res) => {
  res.json({
    service: "location-service",
    status: "UP"
  });
});

const PORT =
process.env.PORT || 8086;

app.listen(PORT, async () => {

  try {

    await createLocationTable();

    console.log(
      `Location Service running on ${PORT}`
    );

  } catch (err) {

    console.error(err);

  }

});
