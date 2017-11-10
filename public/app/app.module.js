"use strict";

angular.module("acpaasportalversionbumper_1.0.0.directives", []);
angular.module("acpaasportalversionbumper_1.0.0.factories", []);
angular.module("acpaasportalversionbumper_1.0.0.services", ["acpaasportalversionbumper_1.0.0.factories"]);
angular.module("acpaasportalversionbumper_1.0.0.controllers", ["acpaasportalversionbumper_1.0.0.services"]);

angular
	.module("acpaasportalversionbumper_1.0.0", [
		"pelorus.services",

		"acpaasportalversionbumper_1.0.0.directives",
		"acpaasportalversionbumper_1.0.0.factories",
		"acpaasportalversionbumper_1.0.0.services",
		"acpaasportalversionbumper_1.0.0.controllers",
	])
	.run([function() {
		console.log("Members module is available!"); // eslint-disable-line no-console
	}]);
