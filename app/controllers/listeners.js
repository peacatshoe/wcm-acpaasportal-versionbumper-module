var Emitter = require("app/middleware/emitter");

function onContentCreated(contentItem) {
	console.log("onContentCreated");
}

function onContentUpdated(contentItem) {
	console.log("onContentUpdated");
}

function onContentRemoved(contentItem) {
	console.log("onContentRemoved");
}

module.exports.start = function start() {
	Emitter.on("contentCreated", onContentCreated);

	Emitter.on("contentUpdated", onContentUpdated);

	Emitter.on("contentRemoved", onContentRemoved);
};
