"use strict";

angular
	.module("acpaasportalversionbumper_0.0.1.controllers")
	.controller("acpaasportalversionbumperOverviewController", [
		"$scope",
		"$timeout",
		"acpaasportalversionbumperFactory",
		"LabelService",
		"NotificationService",

		function(
			$scope,
			$timeout,
			acpaasportalversionbumperFactory,
			LabelService,
			NotificationService
		) {
			$scope.products = [];

			function init() {
				acpaasportalversionbumperFactory.fetchProducts()
					.then(function(products) {
						$scope.products = products;
					});
			}

			init();
		},
	]);
