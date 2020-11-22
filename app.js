const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// server port
const PORT = process.env.PORT | 3000;

// database connection
require('./db/mongo');

// Import router
const router = require('./src/router');

const app = express();

// middleware
app.use(express.static('public'));

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
app.use(router);

app.listen(PORT, () => console.log(`Server running ${PORT}`));
