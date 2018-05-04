require("rootpath")();

var productsController = require("../controllers/products");
var apisController = require("../controllers/apis");
var contentTypesController = require("../controllers/contentTypes");

// Get the configuration of the WCM
var config = require("@wcm/module-helper").getConfig();
// This is a helper middleware function to check if the user is logged in
var ProfileSecurity = require("@wcm/module-helper").profileSecurity;
// This is a helper middleware function to specify which method is used. This will be used in the PermissionsSecurity function.
// There are four methods available: read, create, update and delete.
var MethodSecurity = require("@wcm/module-helper").methodSecurity;
// This is a helper middleware function generator that returns a middleware function that can be injected into route as seen below.
// The function will check if the user has the right permissions to execute this action.
// You need to specify the operation type that needs to be checked against (in this case it is the operation type specified in our package.json file).
var PermissionsSecurity = require("@wcm/module-helper").permissionsSecurity("versionbumper");


// Get the configuration of the WCM
var config = require("config")();
// Building the baseUrl based on the configuration. Every API call needs to be located after the api/ route
var baseUrl = "/" + config.api.prefix + config.api.version + "acpaasportalversionbumper";

module.exports = function(app) {
	app.route(baseUrl + "/types").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, contentTypesController.getTypes);
	app.route(baseUrl + "/products").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, productsController.read);
	app.route(baseUrl + "/products/:product/versions").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, productsController.versions.read);
	app.route(baseUrl + "/products/:product/bump").put(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, productsController.versions.bump);
	app.route(baseUrl + "/products/:product/new").put(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, productsController.versions.create);
	app.route(baseUrl + "/apis").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, apisController.read);
	app.route(baseUrl + "/apis/:api/bump").put(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, apisController.versions.bump);
};
