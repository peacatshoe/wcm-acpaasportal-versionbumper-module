"use strict";

var _ = require("lodash");

var read = require("../helpers/read");
var contentTypesHelper = require("../../helpers/contentTypes");

module.exports = function(req, res) {
	read(contentTypesHelper().api, {
		"fields.organisation": 1,
		"fields.service": 1,
		"fields.version": 1,
	})
	.then(function(apis) {
		var data = (apis || []).reduce(function(acc, curr) {
			var service = _.get(curr, "fields.service", "");
			var organisation = _.get(curr, "fields.organisation", "");
			var key = service + organisation !== "" ? service + organisation : "other";

			acc[key] = acc[key] || [];

			acc[key].push(curr);

			return acc;
		}, {});

		var results = Object.keys(data).map(function(group) {
			return data[group].reduce(function(acc, curr) {
				if (!acc) {
					return curr;
				}

				return _.get(acc, "fields.version", -1) > _.get(curr, "fields.version", -1) ? acc : curr;
			}, null);
		});

		res.status(200).json(results);
	}, function(err) {
		res.status(500).json(err);
	});
};
