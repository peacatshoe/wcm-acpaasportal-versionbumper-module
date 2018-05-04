"use strict";

var _ = require("lodash");

var read = require("../helpers/read");
var contentTypesHelper = require("../../helpers/contentTypes");

function groupByServiceOrganisation(apis) {
	return apis.reduce(function(acc, curr) {
		var service = _.get(curr, "fields.service", "");
		var organisation = _.get(curr, "fields.organisation", "");
		var key = service + organisation !== "" ? service + organisation : "other";

		acc[key] = acc[key] || [];

		acc[key].push(curr);

		return acc;
	}, {});
}

function flattenGroupsToVersions(groups) {
	return Object.keys(groups).map(function(group) {
		return groups[group].reduce(function(acc, curr) {
			if (!acc) {
				return curr;
			}

			return _.get(acc, "fields.version", -1) > _.get(curr, "fields.version", -1) ? acc : curr;
		}, null);
	});
}

module.exports = function(req, res) {
	read(contentTypesHelper().api, null, {
		"fields.organisation": 1,
		"fields.service": 1,
		"fields.version": 1,
	})
		.then(function(apis) {
			res.status(200).json(flattenGroupsToVersions(groupByServiceOrganisation(apis)));
		}, function(err) {
			res.status(500).json(err);
		});
};
