"use strict";

angular.module("acpaasportalversionbumper_0.0.19.directives", []);
angular.module("acpaasportalversionbumper_0.0.19.factories", []);
angular.module("acpaasportalversionbumper_0.0.19.services", ["acpaasportalversionbumper_0.0.19.factories"]);
angular.module("acpaasportalversionbumper_0.0.19.controllers", ["acpaasportalversionbumper_0.0.19.services"]);

angular
	.module("acpaasportalversionbumper_0.0.19", [
		"pelorus.services",

		"acpaasportalversionbumper_0.0.19.directives",
		"acpaasportalversionbumper_0.0.19.factories",
		"acpaasportalversionbumper_0.0.19.services",
		"acpaasportalversionbumper_0.0.19.controllers",
	])
	.run([function() {
		console.log("Members module is available!"); // eslint-disable-line no-console
	}]);
