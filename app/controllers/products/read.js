"use strict";

require("rootpath")();
var _ = require("lodash");

var ContentModel = require("app/models/content");
var contentTypesHelper = require("../helpers/contentType");

module.exports = function(req, res) {
	ContentModel.find({
		"meta.contentType": contentTypesHelper().product,
		"meta.deleted": false,
	})
	.populate("meta.contentType")
	.lean()
	.exec()
	.then(function(products) {
		res.status(200).json(products);
	}, function(err) {
		res.status(500).json(err);
	});
};
