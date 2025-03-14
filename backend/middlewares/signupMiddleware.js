const axios = require("axios");

const API_KEY = process.env.MBL_API_KEY;

const validateSignup = async (req, res, next) => {
  const { username, email, password, age } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required.", success: false });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format.", success: false });
  }

  try {
    const response = await axios.get("http://apilayer.net/api/check", {
      params: {
        access_key: API_KEY,
        email: email,
        smtp: 1,
        format: 1,
      },
    });

    const data = response.data;

    if (!data.format_valid) {
      return res.status(400).json({ message: "Invalid email format.", success: false });
    }

    if (!data.smtp_check) {
      return res.status(400).json({ message: "Email does not exist or is undeliverable.", success: false });
    }
  } catch (error) {
    console.error("Mailboxlayer API error:", error.message);
    return res.status(500).json({ message: "Email validation service unavailable.", success: false });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters.", success: false });
  }

  if (age && (isNaN(age) || age < 0)) {
    return res.status(400).json({ message: "Invalid age.", success: false });
  }

  next();
};

module.exports = { validateSignup };
