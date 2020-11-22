exports.handleErrors = err => {
  // console.log(err.message, err.code);

  // Login incorrent email
  if (err.message === 'incorrect email') {
    return { email: 'That email is not registered' };
  }
  // Login incorrent email
  if (err.message === 'incorrect password') {
    return { password: 'That password is incorrect' };
  }

  // Catching error code 11000 unique email in mongoose model
  if (err.code === 11000) {
    return {
      email: 'Sorry, That email is invalid or existing in database',
    };
  }
  // Catching error messages in mongoose model
  if (err.message.includes('user validation failed')) {
    return {
      email: err.errors.email?.properties.message,
      password: err.errors.password?.properties.message,
    };
  }
};
