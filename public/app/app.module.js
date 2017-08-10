"use strict";

angular.module("acpaasportalversionbumper_0.0.1.directives", []);
angular.module("acpaasportalversionbumper_0.0.1.factories", []);
angular.module("acpaasportalversionbumper_0.0.1.services", ["acpaasportalversionbumper_0.0.1.factories"]);
angular.module("acpaasportalversionbumper_0.0.1.controllers", ["acpaasportalversionbumper_0.0.1.services"]);

angular
	.module("acpaasportalversionbumper_0.0.1", [
		"pelorus.services",

		"acpaasportalversionbumper_0.0.1.directives",
		"acpaasportalversionbumper_0.0.1.factories",
		"acpaasportalversionbumper_0.0.1.services",
		"acpaasportalversionbumper_0.0.1.controllers",
	])
	.run([function() {
		console.log("Members module is available!"); // eslint-disable-line no-console
	}]);
