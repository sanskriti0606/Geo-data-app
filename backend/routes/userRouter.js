// importing necessary packages
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  saveData, // make sure this function handles saving the GeoJSON
} = require("../controllers/userController");
const { auth } = require("../middlewares/auth.middleware");

// define the router
const userRouter = express.Router();

// routes
userRouter.post("/register", registerUser); // User registration
userRouter.post("/login", loginUser); // User login
userRouter.post("/logout", logoutUser); // User logout
userRouter.post("/saveGeoJSON/:userId", auth, saveData); // Use POST for saving GeoJSON

// exporting routers
module.exports = { userRouter };
