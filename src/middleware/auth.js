const User = require('../../model/user');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.user;
  if (!token) {
    return res.status(200).redirect('/login');
  }
  // Decoding hash
  jwt.verify(token, 'net ninja', (err, decoded) => {
    if (err) {
      return res.status(200).redirect('/login');
    }
    next();
  });
};

exports.username = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.user;
  if (token) {
    const { id } = jwt.verify(token, 'net ninja');
    // Check for user ID
    try {
      const user = await User.findById({ _id: id });
      if (!user) {
        return res.status(200).redirect('/login');
      }
      // Write data to local
      res.locals.user = user;
      next();
    } catch (error) {
      return res.status(200).redirect('/login');
    }
  }

  // Default local data
  res.locals.user = null;
  next();
};
