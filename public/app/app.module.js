"use strict";

angular.module("acpaasportalversionbumper_0.0.9.directives", []);
angular.module("acpaasportalversionbumper_0.0.9.factories", []);
angular.module("acpaasportalversionbumper_0.0.9.services", ["acpaasportalversionbumper_0.0.9.factories"]);
angular.module("acpaasportalversionbumper_0.0.9.controllers", ["acpaasportalversionbumper_0.0.9.services"]);

angular
	.module("acpaasportalversionbumper_0.0.9", [
		"pelorus.services",

		"acpaasportalversionbumper_0.0.9.directives",
		"acpaasportalversionbumper_0.0.9.factories",
		"acpaasportalversionbumper_0.0.9.services",
		"acpaasportalversionbumper_0.0.9.controllers",
	])
	.run([function() {
		console.log("Members module is available!"); // eslint-disable-line no-console
	}]);
