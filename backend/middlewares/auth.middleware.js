const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (token) {
    try {
      // Use the correct environment variable here
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
      req.body.userId = decoded.userId; // Attach decoded user info to the request body
      next(); // Move to the next middleware or route handler
    } catch (error) {
      res.status(401).send({ msg: "Invalid or expired token" }); // Handle invalid token
    }
  } else {
    res.status(401).send({ msg: "You are not authorized" }); // No token provided
  }
};

module.exports = { auth };
