"use strict";

require("rootpath")();
var _ = require("lodash");

var ContentModel = require("app/models/content");
var contentTypesHelper = require("../helpers/contentType");

module.exports = function(req, res) {
	ContentModel.findOne({
		"meta.contentType": contentTypesHelper().product,
		"meta.deleted": false,
		"uuid": req.params.product,
	})
	.populate("meta.contentType")
	.lean()
	.exec()
	.then(function(product) {
		res.status(200).json(product);
	}, function(err) {
		res.status(500).json(err);
	});
};
