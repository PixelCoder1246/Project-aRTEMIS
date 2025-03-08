const User = require('../models/user');

class signupController {
  static async signup(req, res) {
    try {
      const { username, fname, lname, email, password, devAI, devAIversion, age } = req.body;

      const newUser = await User.createUser({
        username,
        fname,
        lname,
        email,
        password,
        devAI,
        devAIversion,
        age,
      });

      return res.status(200).json({ message: 'Signed Up Successfully', user: newUser, success : true });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Error signing up!' });
    }
  }
}

module.exports = signupController;