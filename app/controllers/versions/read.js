"use strict";

var contentTypesHelper = require("../../helpers/contentTypes");
var read = require("../helpers/read");

module.exports = function(req, res) {
	read(contentTypesHelper().product_doc_version, {
		"fields.product": req.params.product,
	}, {
		"fields.versionMajor": 1,
		"fields.versionMinor": 1,
		"fields.versionPatch": 1,
	}).then(function(versions) {
		res.status(200).json(versions);
	}, function(err) {
		res.status(500).json(err);
	});
};
