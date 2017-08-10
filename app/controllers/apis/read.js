"use strict";

var read = require("../helpers/read");
var contentTypesHelper = require("../../helpers/contentTypes");

module.exports = function(req, res) {
	read(contentTypesHelper().api)
		.then(function(apis) {
			res.status(200).json(apis);
		}, function(err) {
			res.status(500).json(err);
		});
};
