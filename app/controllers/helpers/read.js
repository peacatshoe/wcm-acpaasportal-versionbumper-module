"use strict";

require("rootpath")();
var _ = require("lodash");

var ContentModel = require("app/models/content");

function find(contentType, q, f) {
	var query = _.extend({
		"meta.contentType": contentType,
		"meta.deleted": false,
	}, q);
	var fields = f === true ? {} : _.extend({
		_id: 0,
		uuid: 1,
		"meta.contentType": 1,
		"meta.lastEditor": 1,
		"meta.label": 1,
		"meta.description": 1,
		"meta.lastModified": 1,
	}, f);

	return ContentModel.find(query, fields);
}

module.exports = function(contentType, query, fields, populated) {
	populated = populated !== undefined ? populated : true;

	if (populated) {
		return find(contentType, query, fields)
			.populate("meta.contentType")
			.populate("meta.lastEditor")
			.lean()
			.exec();
	}

	return find(contentType, query, fields)
		.lean()
		.exec();
};
