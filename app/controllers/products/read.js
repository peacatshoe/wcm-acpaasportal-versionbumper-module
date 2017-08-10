"use strict";

var read = require("./helpers/read");
var contentTypesHelper = require("../../helpers/contentTypes");

module.exports = function(req, res) {
	read(contentTypesHelper().product)
		.then(function(products) {
			res.status(200).json(products);
		}, function(err) {
			res.status(500).json(err);
		});
};
