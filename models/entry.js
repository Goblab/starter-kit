'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	message: { type: String },
	createdAt: { type: String },
	author: { type: ObjectId, ref: 'userSchema' },
};

var entrySchema = new Schema(fields);

module.exports = mongoose.model('Entry', entrySchema);