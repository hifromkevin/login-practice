const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3005;

const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
// const config = require('./config/database.js');

// Load View Engines
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home Route
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Home Page',
		heading: 'Welcome to the Homepage'
	});
});

app.listen(port, () => {
	console.log(`I'll be hosting your app, on port ${port}, hold up.`);
});