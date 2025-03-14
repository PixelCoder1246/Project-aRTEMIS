const mailgun = require('mailgun-js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: 'Email is required', success: false });
    }
    const verifiedUser = await User.findByEmail(email);
    if (!verifiedUser) {
      return res
        .status(400)
        .json({ message: 'Email is not registered', success: false });
    }
    const OTP_EXPIRY = 5 * 60 * 1000;
    const otp = crypto.randomInt(100000, 999999).toString();
    res.cookie('otp_token', otp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: OTP_EXPIRY,
    });

    res.cookie('user_email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: OTP_EXPIRY,
    });

    const emailData = {
      from: 'Your App <no-reply@yourdomain.com>',
      to: email,
      subject: 'Password Reset OTP for aRTEMIS-AI',
      text: `Your OTP for password reset is: ${otp}. It is only valid for 5 minutes.`,
    };

    mg.messages().send(emailData, (error, body) => {
      if (error) {
        console.error('Mailgun Error:', error);
        return res
          .status(500)
          .json({ message: 'Error sending OTP email', success: false });
      }
      res.status(200).json({
        message: 'OTP sent to your email!',
        success: true,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', success: false });
  }
};

const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const storedOtp = req.cookies.otp_token;

  if (!storedOtp) {
    return res
      .status(400)
      .json({ success: false, message: 'OTP expired or not set' });
  }

  if (otp !== storedOtp) {
    return res.status(401).json({ success: false, message: 'Invalid OTP' });
  }

  res.clearCookie('otp_token');

  const sessionToken = crypto.randomBytes(32).toString('hex');
  res.cookie('session_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 10 * 60 * 1000,
  });

  res.json({
    success: true,
    message:
      'OTP verified. Choose an option: Reset Password or Log In Directly.',
  });
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Email and new password are required.',
        });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Password must be at least 8 characters long.',
        });
    }

    const passwordUpdated = await User.updatePassword(email, newPassword);

    if (!passwordUpdated) {
      return res
        .status(500)
        .json({ success: false, message: 'Failed to update password.' });
    }

    res
      .status(200)
      .json({
        success: true,
        message: 'Password reset successful. You can now log in.',
      });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const directLogin = async (req, res) => {
    try {
        const email = req.cookies.user_email;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is missing. Please restart the process." });
        }

        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.clearCookie('user_email');

        res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { forgotPassword, verifyOTP, resetPassword, directLogin };
