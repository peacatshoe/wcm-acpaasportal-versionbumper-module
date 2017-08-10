var listeners = require("../controllers/listeners");
var contentTypes = require("../helpers/contentTypes");

module.exports = function(app, hooks) {
	// Setup listeners
	listeners.start();

	// Setup hooks
	require("../controllers/hooks")(hooks);

	// Update contentTypes
	contentTypes.reload();
};
