exports.index = function(req, res, next) {
	res.sendfile('../../public/admin.html');
};
