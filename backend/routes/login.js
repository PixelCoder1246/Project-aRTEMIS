const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.get('/', (req, res)=> {
    res.json({
        message: 'Welcome to the login page'
    })
})
router.post('/', loginController.login)

module.exports = { router };