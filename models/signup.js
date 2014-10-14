'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	username: { type: String },
	email: { type: String },
	password: { type: String }, 
	confirmPassword: { type: String } 
};

var signupSchema = new Schema(fields);

module.exports = mongoose.model('Signup', signupSchema);