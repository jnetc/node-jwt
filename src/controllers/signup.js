const User = require('../../model/user');
// Validation
const validator = require('../utils/validator');

const { createToken } = require('../utils/jwt');

const maxAge = 3 * 24 * 60 * 60;

exports.signup_get = (req, res) => {
  res.render('signup');
};

exports.signup_post = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Saving to database
    const user = await User.create({ email, password, username });
    // Generate token
    const token = createToken(user._id, maxAge);
    // Set cookies
    res.cookie('user', token, {
      httpOnly: true,
      sameSite: true,
      maxAge,
    });
    // Send status
    res.status(201).json({
      status: 'ok',
      msg: `Congratulation ${username}! You are registered.`,
    });
  } catch (error) {
    res.status(400).json({ errors: validator.handleErrors(error) });
  }
};
