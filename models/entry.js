'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	message: { type: String },
	createdAt: { type: Date },
	author: { type: ObjectId, ref: 'userSchema' },
	comments: [{ type: ObjectId, ref: 'commentSchema' }]
};

var entrySchema = new Schema(fields);

module.exports = mongoose.model('Entry', entrySchema);