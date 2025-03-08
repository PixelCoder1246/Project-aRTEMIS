const jwt = require("jsonwebtoken");
const { findById } = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);

    if (!req.cookies || !req.cookies.token) {
      return res.status(401).json({ loggedIn: false, error: "No token provided" });
    }

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findById(decoded.id);
    if (!user) {
      return res.status(401).json({ loggedIn: false, error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ loggedIn: false, error: "Invalid token" });
  }
};

module.exports = authMiddleware;
