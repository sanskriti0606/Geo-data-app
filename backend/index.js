const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
require("dotenv").config();
const { userRouter } = require("./routes/userRouter");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/users", userRouter); // User routes

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Homepage.");
});

// Starting the server
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB connection is established first
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit if server cannot start
  }
};

startServer();
