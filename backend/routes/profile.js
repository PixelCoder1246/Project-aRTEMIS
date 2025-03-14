const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
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

module.exports = { router };