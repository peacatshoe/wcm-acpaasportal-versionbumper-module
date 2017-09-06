"use strict";

angular
	.module("acpaasportalversionbumper_0.0.19")
	.config([
		"$stateProvider",
		"acpaasportalversionbumperConfigProvider",

		function(
			$stateProvider,
			acpaasportalversionbumperConfigProvider
		) {

			var moduleFolder = acpaasportalversionbumperConfigProvider.API.modulePath;

			$stateProvider
			.state("pelorus.acpaasportalversionbumper.index", {
				url: "",
				access: {
					requiresLogin: true,
				},
				ncyBreadcrumb: {
					label: "{{breadcrumb}}",
				},
				templateUrl: moduleFolder + "views/overview.html",
				controller: "acpaasportalversionbumperOverviewController",
			});
		},
	]
);
