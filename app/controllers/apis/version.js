module.exports.bump = function(req, res) {
	console.log("BUMP API", req.params.api, req.body);

	res.status(200).json(null);
};

module.exports.create = function(req, res) {
	console.log("BUMP API", req.params.api, req.body);

	res.status(200).json(null);
};
