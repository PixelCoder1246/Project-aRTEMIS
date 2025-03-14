const express = require("express");
const { verifyTurnstile } = require("../middlewares/recaptchaMiddleware");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.post("/", verifyTurnstile, loginController.login);

module.exports = { router };
