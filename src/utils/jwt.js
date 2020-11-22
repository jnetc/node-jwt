const jwt = require('jsonwebtoken');

exports.createToken = (id, maxAge) => {
  return jwt.sign({ id }, 'net ninja', { expiresIn: maxAge });
};
