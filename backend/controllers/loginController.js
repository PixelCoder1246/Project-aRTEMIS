const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class loginController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findByEmail(email);
            if(!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                }
            )

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 3600000,
                secure : process.env.NODE_ENV === "production",
                sameSite : "strict",
            })

            res.status(200).json({
                message: 'Logged in successfully',
                success : true,
            })
        } catch (error) {
            res.status(500).json({ message: 'Error Logging In' });
        }
    }
}

module.exports = loginController