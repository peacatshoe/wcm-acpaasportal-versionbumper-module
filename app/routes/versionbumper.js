require("rootpath")();

var authHelper = require("../helpers/auth");
var productsController = require("../controllers/products");

// Get the configuration of the WCM
var config = require("config")();
// Building the baseUrl based on the configuration. Every API call needs to be located after the api/ route
var baseUrl = "/" + config.api.prefix + config.api.version + "acpaasportal-versionbumper";

module.exports = function(app) {
	app.route(baseUrl + "/products").get(authHelper.prepareMember, productsController.read);
	app.route(baseUrl + "/products/:product").get(authHelper.prepareMember, productsController.readOne);
	app.route(baseUrl + "/products/:product/bump").put(authHelper.prepareMember, productsController.bumpVersion);
};
