module.exports = function(app) {
	// api routing
	var api = require('../controllers/api.controllers');
	app.route('/api/node')
		.get(api.get)
		.post(api.save);
};