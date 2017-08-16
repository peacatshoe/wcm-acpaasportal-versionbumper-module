var _ = require("lodash");

var readOne = require("../helpers/readOne");
var create = require("../helpers/create");
var slug = require("../helpers/slug");
var contentTypesHelper = require("../../helpers/contentTypes");

module.exports.bump = function(req, res) {
	readOne(req.params.api).then(function(version) {
		var versionLabel = req.body.label.replace(/\sv[0-9\.]+$/, "") + " v" + req.body.version.major;
		var newVersion = {
			fields: _.extend(_.cloneDeep(version.fields), {
				title: versionLabel,
				version: req.body.version.major,
				organisation: req.body.organisation,
				service: req.body.service,
			}),
			meta: {
				activeLanguages: version.meta.activeLanguages,
				contentType: contentTypesHelper().api,
				label: versionLabel,
				publishDate: new Date(),
				published: version.meta.published,
				status: version.meta.status,
				slug: slug(versionLabel, version.meta.activeLanguages),
			},
		};

		create(newVersion)
			.then(function(response) {
				res.status(200).json(response);
			}, function(err) {
				res.status(500).json(err);
			});
	}, function() {
		return res.status(404).json({ err: "No versions available for api!" });
	});
};
