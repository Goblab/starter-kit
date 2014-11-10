'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
 
};

var rabbitSchema = new Schema(fields);

module.exports = mongoose.model('Rabbit', rabbitSchema);