var read = require("./read");
var versionHelper = require("./version");

module.exports = {
	read: read,
	bumpVersion: versionHelper.bump,
	createVersion: versionHelper.create,
};
