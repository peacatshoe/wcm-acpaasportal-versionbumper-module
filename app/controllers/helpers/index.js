var request = require("./request");
var error = require("./error");
var read = require("./read");
var readOne = require("./readOne");
var create = require("./create");
var slug = require("./slug");

module.exports = {
	request: request,
	error: error,
	read: read,
	readOne: readOne,
	create: create,
	slug: slug,
};
