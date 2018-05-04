"use strict";

require("rootpath")();

var ContentModel = require("app/models/content");

module.exports = function(newVersion) {
	return ContentModel.create(newVersion)
		.then(function(response) {
			return response;
		}, function(err) {
			throw err;
		});
};
