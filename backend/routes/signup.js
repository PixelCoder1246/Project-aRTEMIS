const express = require('express');
const router = express.Router();
const { validateSignup } = require('../middlewares/signupMiddleware');
const signupController = require('../controllers/signupController');

router.post('/', validateSignup, signupController.signup);
module.exports = { router };