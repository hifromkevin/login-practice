const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		require: true
	},
	lastName: {
		type: String,
		require: true
	},
	phone: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	company: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	role: {
		type: String,
		require: true
	}
});

const User = module.exports = mongoose.model('User', UserSchema);