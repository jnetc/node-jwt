const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const validator = require('../src/utils/validator');

const User = new Schema({
  email: {
    type: String,
    required: [true, 'Plaese enter an email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Plaese enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Plaese enter an password'],
    minlength: [6, 'Minimum password length is 6 characters'],
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
});

// Static method
User.statics.login = async function (email, password) {
  const [user] = await this.find({ email }).exec();
  // Check user
  if (!user) {
    throw Error('incorrect email');
  }
  // Check password
  const pass = await bcrypt.compare(password, user.password);
  if (!pass) {
    throw Error('incorrect password');
  }
  // Return user
  return user;
};

// Mongoose hooks

// fire a function after document saved to db
// 2 arguments
User.post('save', async function (doc, next) {
  // console.log('Post model', doc);
  next();
});

// fire a function before doc saved to db
// 1 argument
User.pre('save', async function (next) {
  // console.log('Pre model', this);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = model('user', User);
