const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
// const { forgotPassword } = require('../controllers/forgotPassController');
const router = express.Router();

router.get('/status', authMiddleware, (req, res)=> {
    res.json({ loggedIn: true, user: req.user });
});

router.post('/logout', (req, res)=> {
    res.clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None"
    });
    
    res.json({ loggedIn: false });
});

// router.post('/forgot-password', forgotPassController);

module.exports = { router };