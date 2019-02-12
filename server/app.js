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
const config = require('./config/database.js');

// Connect to DB
mongoose.connect(config.database, { useNewUrlParser: true });

let db = mongoose.connection;

// Check Connection
db.once('open', () => {
	console.log('DB HELLA connected');
});

// Check for DB Errors
db.on('error', (err) => {
	console.log(err);
});

// Load View Engines
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
})); 


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