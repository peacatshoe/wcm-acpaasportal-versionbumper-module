var contentTypes = require("./helpers/contentTypes");
var versionBumperRoutes = require("./routes/versionbumper");
var variablesHelper = require("./helpers/variables");

module.exports = function(app, hooks, info) {
	variablesHelper.set(info);
	// Setup hooks
	require("../controllers/hooks")(hooks);
	// Update contentTypes
	contentTypes.reload();
	// Setup routes
	versionBumperRoutes(app);
};
