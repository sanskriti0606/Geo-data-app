const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blacklist = require('../models/blackListModel');

// Register User
const registerUser = async (req, res) => {
  const { username, email, password, GeoJSONData } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
      GeoJSONData,
    });

    await user.save();
    res.status(201).send({ message: "User created successfully!" });
  } catch (error) {
    console.error(`Error at registration: ${error}`);
    res.status(500).send({ error: `Error at registration: ${error.message}` });
  }
};

// Login User


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      // Ensure JWT_SECRET is used here
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return res.status(200).send({ msg: "Login successful", token, userId: user._id });
    } else {
      return res.status(401).send({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.log(`Error at Login: ${error}`);
    res.status(500).send({ msg: `Error at Login: ${error.message}` });
  }
};



// Logout User
const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ msg: "An error occurred during logout" });
  }
};




// Save GeoJSON Data
const saveData = async (req, res) => {
  const { userId } = req.params;
  const { GeoJSONData } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, { $push: { GeoJSONData } }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "GeoJSON data saved successfully", user });
  } catch (error) {
    console.error("Error saving GeoJSON data:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, saveData };
