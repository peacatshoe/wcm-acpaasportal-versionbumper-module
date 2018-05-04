"use strict";

angular.module("acpaasportalversionbumper_1.0.2.directives", []);
angular.module("acpaasportalversionbumper_1.0.2.factories", []);
angular.module("acpaasportalversionbumper_1.0.2.services", ["acpaasportalversionbumper_1.0.2.factories"]);
angular.module("acpaasportalversionbumper_1.0.2.controllers", ["acpaasportalversionbumper_1.0.2.services"]);

angular
	.module("acpaasportalversionbumper_1.0.2", [
		"pelorus.services",

		"acpaasportalversionbumper_1.0.2.directives",
		"acpaasportalversionbumper_1.0.2.factories",
		"acpaasportalversionbumper_1.0.2.services",
		"acpaasportalversionbumper_1.0.2.controllers",
	])
	.run([function() {
		console.log("Members module is available!"); // eslint-disable-line no-console
	}]);
