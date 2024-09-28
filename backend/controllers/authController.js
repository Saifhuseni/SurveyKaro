
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user
    user = new User({ username, email, password });
    await user.save();

    // Generate JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user.id, username, email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Generate JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, username: user.username, email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
