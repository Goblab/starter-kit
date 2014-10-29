'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	message: { type: String },
	createdAt: { type: String },
	author: { type: ObjectId, ref: 'userSchema' },
	entry: { type: ObjectId, ref: 'entrySchema' }
};

var commentSchema = new Schema(fields);

module.exports = mongoose.model('Comment', commentSchema);