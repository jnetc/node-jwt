const express = require('express');

const signup = require('./controllers/signup');
const signin = require('./controllers/login');
const logout = require('./controllers/logout');

const { auth, username } = require('./middleware/auth');

const router = express.Router();

router.get('*', [username]);
router.get('/', (req, res) => res.render('home'));
router.get('/smoothies', [auth], (req, res) => res.render('smoothies'));

// Auth
router.get('/signup', signup.signup_get);
router.post('/signup', signup.signup_post);
router.get('/login', signin.login_get);
router.post('/login', signin.login_post);
router.get('/logout', logout.logout_get);

module.exports = router;
