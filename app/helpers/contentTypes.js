"use strict";

require("rootpath")();
var _ = require("lodash");

var ContentTypeModel = require("app/models/contentType");

var safeLabels = [
	"product",
	"api",
	"product_doc_version",
];
var contentTypes = {};
var list = [];

module.exports = function getContentTypes() {
	return contentTypes;
};

module.exports.reload = function reload() {
	ContentTypeModel
		.find({
			"meta.deleted": false,
			"meta.safeLabel": {
				$in: safeLabels,
			},
		})
		.lean()
		.exec()
		.then(function(types) {
			contentTypes = types.reduce(function(acc, type) {
				acc[type.meta.safeLabel] = type._id.toString();
				return acc;
			}, {});
			list = types.map(function(type) {
				return {
					id: type._id.toString(),
					label: type.meta.safeLabel,
					uuid: type.uuid,
				};
			});
		}, function(err) {
			throw err;
		});
};

module.exports.verifyType = function verifyType(type) {
	type = typeof type === "string" ? type : type._id;

	return toList(contentTypes).find(function(t) {
		return t.id === type.toString();
	});
};

module.exports.toList = function() {
	return list;
};
