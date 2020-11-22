const User = require('../../model/user');
// Validation
const validator = require('../utils/validator');

const { createToken } = require('../utils/jwt');

const maxAge = 3 * 24 * 60 * 60;

exports.login_get = (req, res) => {
  res.render('login');
};
exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Login user
    const user = await User.login(email, password);
    // Generate token
    const token = createToken(user._id, maxAge);
    // Set cookies
    res.cookie('user', token, {
      httpOnly: true,
      sameSite: true,
      maxAge,
    });
    // Send status
    res.status(200).json({ status: 'ok', msg: `Welcome ${email}` });
  } catch (error) {
    res.status(400).json({ errors: validator.handleErrors(error) });
  }
};
