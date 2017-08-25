"use strict";

angular.module("acpaasportalversionbumper_0.0.10.directives", []);
angular.module("acpaasportalversionbumper_0.0.10.factories", []);
angular.module("acpaasportalversionbumper_0.0.10.services", ["acpaasportalversionbumper_0.0.10.factories"]);
angular.module("acpaasportalversionbumper_0.0.10.controllers", ["acpaasportalversionbumper_0.0.10.services"]);

angular
	.module("acpaasportalversionbumper_0.0.10", [
		"pelorus.services",

		"acpaasportalversionbumper_0.0.10.directives",
		"acpaasportalversionbumper_0.0.10.factories",
		"acpaasportalversionbumper_0.0.10.services",
		"acpaasportalversionbumper_0.0.10.controllers",
	])
	.run([function() {
		console.log("Members module is available!"); // eslint-disable-line no-console
	}]);
