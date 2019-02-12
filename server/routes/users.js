const require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user.js');

router.get('/register', (req, res) => {
	res.render('register', {
		title: 'Register Your Account'
	});
});

router.post('/register', (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const phone = req.body.phone;
	const email = req.body.email;
	const companyName = req.body.companyName;
	const password = req.body.password;
	const password2 = req.body.password2;
	const role = req.body.role;

	req.checkBody('firstName', 'First name is required').notEmpty();
	req.checkBody('lastName', 'Last name is required').notEmpty();
	req.checkBody('phone', 'Phone number is required').notEmpty();
	req.checkBody('email', 'Email address is required').notEmpty();
	req.checkBody('companyName', 'Company name is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(password);
	// req.checkBody('role', 'Role is required').notEmpty();

	let errors = req.validationErrors();
	if (errors) {
		res.render('register', {
			title: 'Register Your Account',
			errors: errors
		});
	} else {
		let newUser = new User({
			firstName: firstName,
			lastName: lastName,
			phone: phone,
			email: email,
			companyName: companyName,
			password: password,
			role: role
		});

		bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) console.log(err); 
						newUser.password = hash;
						newUser.save((err) => {
								if(err) {
										console.log(err); 
										return; 
								} else {
										req.flash('success', 'You are now registered and can log in.'); 
										res.redirect('/users/login'); 
								}
						}); 
				}); 
		});
	}
});

// Login Form
router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Login'
	});
});

// Login Process
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: 'You must log in first.'
	})(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'You have been logged out.');
	res.redirect('/users/login');
});

module.exports = router;
