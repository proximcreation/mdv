/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var moment   = require('moment');
var jwt      = require('jwt-simple');
var Node     = mongoose.model('Node');

exports.save = function(req, res, next) {
	console.log(req.body.body);
	var node = new Node(req.body);
	node.save(function(err) {
		if (err)
			return res.json({ error: 'back_err_val_node' });

		res.json({ message: 'back_node_ok' });
	});
};
exports.get = function(req, res, next) {
	Node.find(JSON.parse(req.headers.query), function(err, nodes) {
		if (err){
			console.log(err)
			return res.json({ error: 'back_err_mongo' });
		}

		res.json(nodes);
	});
};