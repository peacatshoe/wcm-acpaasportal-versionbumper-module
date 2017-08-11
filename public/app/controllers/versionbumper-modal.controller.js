"use strict";

angular
	.module("acpaasportalversionbumper_0.0.1.controllers")
	.controller("acpaasportalversionbumperModalController", [
		"$scope",
		"acpaasportalversionbumperFactory",

		function(
			$scope,
			acpaasportalversionbumperFactory
		) {
			$scope.minvalue = {
				major: 0,
				minor: 0,
				patch: 0,
			};
			$scope.status = {
				loading: true,
				valid: false,
			};
			$scope.versions = [];

			function init() {
				if ($scope.ngDialogData.type.label === "product") {
					fetchVersions();
				} else {
					$scope.minvalue.major = $scope.ngDialogData.version.major + 1;
					$scope.loading = false;
				}
			}

			function fetchVersions() {
				$scope.status.loading = true;

				acpaasportalversionbumperFactory.fetchVersionsForProduct($scope.ngDialogData.item.uuid)
					.then(function(versions) {
						$scope.versions = versions.map(function(version) {
							return {
								major: _.get(version, "fields.versionMajor", 0),
								minor: _.get(version, "fields.versionMinor", 0),
								patch: _.get(version, "fields.versionPatch", 0),
							};
						}).sort(sortVersions);
						$scope.minvalue = _.last($scope.versions);
						$scope.ngDialogData.version = {
							major: _.get($scope.minvalue, "major", 0),
							minor: _.get($scope.minvalue, "minor", 0),
							patch: _.get($scope.minvalue, "patch", 0) + 1,
						};
						$scope.status.valid = validateVersion($scope.ngDialogData.version, $scope.minvalue);
						$scope.status.loading = false;
					});
			}

			function sortVersions(a, b) {
				var levels = ["major", "minor", "patch"];

				for (var i = 0; i < levels.length; i += 1) {
					var level = levels[i];
					var sorted = sortVersion(a[level], b[level]);

					if (i === levels.length - 1) {
						return sorted;
					}

					if (sorted === 0) {
						continue;
					}

					return sorted;
				}
			}

			function sortVersion(a, b) {
				if (a > b) {
					return 1;
				}

				if (a < b) {
					return -1;
				}

				return 0;
			}

			function versionUpdated() {
				$scope.status.valid = validateVersion($scope.ngDialogData.version, $scope.minvalue);

				if ($scope.status.valid) {
					$scope.minvalue = _.clone($scope.ngDialogData.version);
				}
			}

			function validateVersion(version, minvalue) {
				return sortVersions(version, minvalue) > 0;
			}

			$scope.versionUpdated = versionUpdated;

			init();
		},
	]);


