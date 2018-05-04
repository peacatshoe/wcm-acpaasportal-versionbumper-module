var variablesHelper = require("../helpers/variables");
var contentTypesHelper = require("../helpers/contentTypes");

var onConfigurationChanged = function onConfigurationChanged() {
	console.log("on configuration changed");
	// Reload config
	variablesHelper.reload();
	contentTypesHelper.reload();
};

var onLoadComplete = function onLoadComplete() {
	console.log("onLoadComplete");
	onConfigurationChanged();
};

module.exports = function handleHooks(hooks) {
	var myHooks = {
		onConfigurationChanged: onConfigurationChanged,
		onLoadComplete: onLoadComplete,
	};

	Object.assign(hooks, myHooks);
};
