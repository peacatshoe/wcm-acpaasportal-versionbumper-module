"use strict";

angular
	.module("acpaasportalversionbumper_0.0.2.factories")
	.factory("acpaasportalversionbumperFactory", [
		"$http",
		"configuration",

		function(
			$http,
			configuration
		) {
			var api = configuration.serverPath + configuration.apiPrefix + configuration.apiLevel + "acpaasportalversionbumper";
			var factory = {};

			function handleResponse(response) {
				return response.data;
			}

			factory.fetchTypes = function() {
				return $http.get(api + "/types")
					.then(handleResponse);
			}

			factory.fetchProducts = function() {
				return $http.get(api + "/products")
					.then(handleResponse);
			};

			factory.fetchApis = function() {
				return $http.get(api + "/apis")
					.then(handleResponse);
			};

			factory.fetchVersionsForProduct = function(product) {
				return $http.get(api + "/versions/" + product)
					.then(handleResponse);
			};

			factory.bumpVersion = function(data) {
				return $http.put([api, data.type + "s", data.item, "bump"].join("/"), {
					label: data.label,
					version: data.version,
				}).then(handleResponse);
			};

			factory.newVersion = function(data) {
				return $http.put([api, data.type + "s", data.item, "new"].join("/"))
					.then(handleResponse);
			};

			return factory;
		},
	]);
