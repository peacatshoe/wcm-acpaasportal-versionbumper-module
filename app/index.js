var contentTypes = require("./helpers/contentTypes");
var versionBumperRoutes = require("./routes/versionbumper");
var variablesHelper = require("./helpers/variables");
var hooksController = require("./controllers/hooks");

module.exports = function(app, hooks, info) {
	variablesHelper.set(info);
	// Setup hooks
	hooksController(hooks);
	// Update contentTypes
	contentTypes.reload();
	// Setup routes
	versionBumperRoutes(app);
};
