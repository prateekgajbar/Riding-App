require("dotenv").config();

const express = require("express");

const app = express();

const userRoutes =
  require("./routes/userRoutes");

const {
  createProfileTable
} = require("./models/userModel");

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({
    service: "user-service",
    status: "UP"
  });
});

const PORT = process.env.PORT || 8082;

app.listen(PORT, async () => {
  try {
    await createProfileTable();

    console.log(
      `User Service running on ${PORT}`
    );
  } catch (err) {
    console.error(err);
  }
});
