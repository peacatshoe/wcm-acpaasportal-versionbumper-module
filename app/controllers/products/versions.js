var _ = require("lodash");

var readOne = require("../helpers/readOne");
var read = require("../helpers/read");
var create = require("../helpers/create");
var slug = require("../helpers/slug");
var contentTypesHelper = require("../../helpers/contentTypes");

module.exports.bump = function(req, res) {
	read(contentTypesHelper().product_doc_version, {
		"fields.product": req.params.product,
	}, true, false).then(function(versions) {
		var version = _.chain(versions).sortBy(["fields.versionMajor", "fields.versionMinor", "fields.versionPatch"]).last().value();

		if (!version) {
			return res.status(404).json({ err: "No versions available for product!" });
		}

		var versionLabel = req.body.label.replace(/\sv[0-9\.]+$/, "") + " v" + [req.body.version.major, req.body.version.minor, req.body.version.patch].join(".");
		var newVersion = {
			fields: _.extend(_.cloneDeep(version.fields), {
				versionMajor: req.body.version.major,
				versionMinor: req.body.version.minor,
				versionPatch: req.body.version.patch,
				product: req.params.product,
			}),
			meta: {
				activeLanguages: version.meta.activeLanguages,
				contentType: contentTypesHelper().product_doc_version,
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
	});
};

module.exports.create = function(req, res) {
	readOne(contentTypesHelper().product, {
		"uuid": req.params.product,
	}, {
		"meta.activeLanguages": 1,
		"meta.published": 1,
		"meta.status": 1,
		"meta.label": 1,
	}, false).then(function(product) {
		var versionLabel = product.meta.label + " v0.0.1";
		var newVersion = {
			fields: {
				versionMajor: 0,
				versionMinor: 0,
				versionPatch: 1,
				product: req.params.product,
			},
			meta: {
				activeLanguages: product.meta.activeLanguages,
				contentType: contentTypesHelper().product_doc_version,
				label: versionLabel,
				publishDate: new Date(),
				published: product.meta.published,
				status: "DRAFT",
				slug: slug(versionLabel, product.meta.activeLanguages),
			},
		};

		create(newVersion)
			.then(function(response) {
				res.status(200).json(response);
			}, function(err) {
				res.status(500).json(err);
			});
	}, function(err) {
		res.status(500).json(err);
	});
};

module.exports.read = function(req, res) {
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
