var contentTypesHelper = require("../helpers/contentTypes");

module.exports.getTypes = function(req, res) {
	res.status(200).json(contentTypesHelper.toList(contentTypesHelper()).filter(function(type) {
		return type.type !== "product_doc_version";
	}));
}
