var contentTypesHelper = require("../helpers/contentTypes");

module.exports.getTypes = function(req, res) {
	res.status(200).json(contentTypesHelper.toList().filter(function(type) {
		return type.label !== "product_doc_version";
	}));
};
