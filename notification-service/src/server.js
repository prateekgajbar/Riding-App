require("dotenv").config();

const express = require("express");

const app = express();

const notificationRoutes =
require("./routes/notificationRoutes");

const {
  createNotificationTable
} = require("./models/notificationModel");

app.use(express.json());

app.use(
  "/api/notifications",
  notificationRoutes
);

app.get("/health", (req, res) => {

  res.json({
    service: "notification-service",
    status: "UP"
  });

});

const PORT =
process.env.PORT || 8087;

app.listen(PORT, async () => {

  try {

    await createNotificationTable();

    console.log(
      `Notification Service running on ${PORT}`
    );

  } catch (err) {

    console.error(err);

  }

});
