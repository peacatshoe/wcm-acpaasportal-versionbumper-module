"use strict";

angular.module("acpaasportalversionbumper_0.0.4.directives", []);
angular.module("acpaasportalversionbumper_0.0.4.factories", []);
angular.module("acpaasportalversionbumper_0.0.4.services", ["acpaasportalversionbumper_0.0.4.factories"]);
angular.module("acpaasportalversionbumper_0.0.4.controllers", ["acpaasportalversionbumper_0.0.4.services"]);

angular
	.module("acpaasportalversionbumper_0.0.4", [
		"pelorus.services",

		"acpaasportalversionbumper_0.0.4.directives",
		"acpaasportalversionbumper_0.0.4.factories",
		"acpaasportalversionbumper_0.0.4.services",
		"acpaasportalversionbumper_0.0.4.controllers",
	])
	.run([function() {
		console.log("Members module is available!"); // eslint-disable-line no-console
	}]);
