exports.logout_get = (req, res) => {
  res.clearCookie('user');
  res.redirect('/');
};
