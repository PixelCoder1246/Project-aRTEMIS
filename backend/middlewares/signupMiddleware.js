const validateSignup = (req, res, next) => {
    const { username, fname, lname, email, password, devAI, devAIversion, age } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
  
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }
  
    if (age && (isNaN(age) || age < 0)) {
      return res.status(400).json({ message: 'Invalid age.' });
    }
  
    next();
  };
  
  module.exports = { validateSignup };