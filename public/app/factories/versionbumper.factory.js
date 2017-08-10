"use strict";

angular
	.module("acpaasportalversionbumper_0.0.1.factories")
	.factory("acpaasportalversionbumperFactory", [
		"$http",
		"configuration",

		function(
			$http,
			configuration
		) {
			var api = configuration.serverPath + configuration.apiPrefix + configuration.apiLevel;
			var factory = {};

			factory.fetchProducts = function() {
				return $http.get(api + "acpaasportalversionbumper/products");
			};

			return factory;
		},
	]);
