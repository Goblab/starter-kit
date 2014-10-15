'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	name: { type: String },
	last_name: { type: String },
	age: { type: Number },
	avatar: { type: String },
  	user: { type: ObjectId, ref: 'userSchema' },
};

var profileSchema = new Schema(fields);

module.exports = mongoose.model('Profile', profileSchema);
