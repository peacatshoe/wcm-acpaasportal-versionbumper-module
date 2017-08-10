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
			var api = configuration.serverPath + configuration.apiPrefix + configuration.apiLevel + "acpaasportalversionbumper";
			var factory = {};

			factory.fetchTypes = function() {
				return $http.get(api + "/types")
					.then(function(response) {
						return response.data;
					});
			}

			factory.fetchProducts = function() {
				return $http.get(api + "/products")
					.then(function(response) {
						return response.data;
					});
			};

			factory.fetchApis = function() {
				return $http.get(api + "/apis")
					.then(function(response) {
						return response.data;
					});
			}

			return factory;
		},
	]);
