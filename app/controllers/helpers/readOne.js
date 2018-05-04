"use strict";

require("rootpath")();
var _ = require("lodash");

var ContentModel = require("app/models/content");

module.exports = function(uuid, query, fields) {
	var query = _.extend({
		"uuid": uuid,
		"meta.deleted": false,
	}, query);

	return ContentModel.findOne(query, fields)
		.lean()
		.exec()
		.then(function(response) {
			return response;
		}, function(err) {
			throw err;
		});
};
