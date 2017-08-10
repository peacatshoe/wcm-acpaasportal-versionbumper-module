var variablesHelper = require("../helpers/variables");
var contentTypesHelper = require("../helpers/contentTypes");

var onConfigurationChanged = function onConfigurationChanged() {
	console.log("on configuration changed");
	// Reload config
	variablesHelper.reload();
	contentTypesHelper.reload();
};

var beforeRemove = function beforeRemove() {
	console.log("before remove");
};

var beforeDisable = function beforeDisable() {
	console.log("before disable");
};

var onLoadComplete = function onLoadComplete() {
	console.log("onLoadComplete");
	onConfigurationChanged();
};

module.exports = function handleHooks(hooks) {
	var myHooks = {
		onConfigurationChanged: onConfigurationChanged,
		beforeRemove: beforeRemove,
		onLoadComplete: onLoadComplete,
		beforeDisable: beforeDisable,
	};

	Object.assign(hooks, myHooks);
};
