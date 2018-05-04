require("rootpath")();

var authHelper = require("../helpers/auth");
var productsController = require("../controllers/products");
var apisController = require("../controllers/apis");
var contentTypesController = require("../controllers/contentTypes");

// Get the configuration of the WCM
var config = require("config")();
// Building the baseUrl based on the configuration. Every API call needs to be located after the api/ route
var baseUrl = "/" + config.api.prefix + config.api.version + "acpaasportalversionbumper";

module.exports = function(app) {
	app.route(baseUrl + "/types").get(authHelper.prepareMember, contentTypesController.getTypes);
	app.route(baseUrl + "/products").get(authHelper.prepareMember, productsController.read);
	app.route(baseUrl + "/products/:product/versions").get(authHelper.prepareMember, productsController.versions.read);
	app.route(baseUrl + "/products/:product/bump").put(authHelper.prepareMember, productsController.versions.bump);
	app.route(baseUrl + "/products/:product/new").put(authHelper.prepareMember, productsController.versions.create);
	app.route(baseUrl + "/apis").get(authHelper.prepareMember, apisController.read);
	app.route(baseUrl + "/apis/:api/bump").put(authHelper.prepareMember, apisController.versions.bump);
};
