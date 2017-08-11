"use strict";

angular.module("acpaasportalversionbumper_0.0.2.directives", []);
angular.module("acpaasportalversionbumper_0.0.2.factories", []);
angular.module("acpaasportalversionbumper_0.0.2.services", ["acpaasportalversionbumper_0.0.2.factories"]);
angular.module("acpaasportalversionbumper_0.0.2.controllers", ["acpaasportalversionbumper_0.0.2.services"]);

angular
	.module("acpaasportalversionbumper_0.0.2", [
		"pelorus.services",

		"acpaasportalversionbumper_0.0.2.directives",
		"acpaasportalversionbumper_0.0.2.factories",
		"acpaasportalversionbumper_0.0.2.services",
		"acpaasportalversionbumper_0.0.2.controllers",
	])
	.run([function() {
		console.log("Members module is available!"); // eslint-disable-line no-console
	}]);
