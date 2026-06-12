require("dotenv").config();

const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");

const { createUserTable } = require("./models/userModel");

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({
    service: "auth-service",
    status: "UP",
  });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, async () => {
  try {
    await createUserTable();

    console.log(
      `Auth Service running on ${PORT}`
    );
  } catch (err) {
    console.error(err);
  }
});
