const axios = require('axios');

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

const verifyTurnstile = async (req, res, next) => {
  try {
    console.log('Turnstile Secret Key:', TURNSTILE_SECRET_KEY);
    const { turnstileToken } = req.body;
    if (!turnstileToken) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing CAPTCHA token' });
    }

    const response = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const data = response.data;

    if (!data.success || (data.score !== undefined && data.score < 0.5)) {
      return res
        .status(403)
        .json({ success: false, message: 'CAPTCHA verification failed' });
    }

    next();
  } catch (error) {
    console.error(
      '❌ Error verifying Turnstile:',
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({
        success: false,
        message: 'Server error while verifying CAPTCHA',
      });
  }
};

module.exports = { verifyTurnstile };
