/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * NodeSchema
 */
var NodeSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: Schema.Types.Mixed
	},
	fields: {
		type: Schema.Types.Mixed
	},
	params: {
		type: Schema.Types.Mixed
	},
	type: {
		type: String,
		required : true
	},
	userId: {
		type: Schema.Types.ObjectId,
		//required: true
	},
	published: {
		type: Boolean,
		default: true
	},
	locked: {
		type: Schema.Types.ObjectId
	},
	dateCreated: {
		type: Date,
		default: Date.now
	},
	dateModified: {
		type: Date
	},
	datePublished: {
		type: Date
	}
});

mongoose.model('Node', NodeSchema);
