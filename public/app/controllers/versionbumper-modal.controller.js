"use strict";

angular
	.module("acpaasportalversionbumper_0.0.2.controllers")
	.controller("acpaasportalversionbumperModalController", [
		"$scope",
		"$timeout",
		"$state",
		"acpaasportalversionbumperFactory",
		"acpaasportalversionhelperFactory",
		"NotificationService",
		"LabelService",

		function(
			$scope,
			$timeout,
			$state,
			acpaasportalversionbumperFactory,
			acpaasportalversionhelperFactory,
			NotificationService,
			LabelService
		) {
			$scope.minvalue = {
				major: 0,
				minor: 0,
				patch: 0,
			};
			$scope.status = {
				loading: true,
				bumping: false,
				valid: false,
			};
			$scope.versions = [];

			function init() {
				if ($scope.ngDialogData.type.label === "product") {
					fetchVersions();
				} else {
					$scope.ngDialogData.version.major = $scope.ngDialogData.version.major + 1;
					$scope.minvalue = _.clone($scope.ngDialogData.version);
					$scope.status.valid = acpaasportalversionhelperFactory.validateVersion($scope.ngDialogData.version, $scope.versions);
					$scope.status.loading = false;
				}
			}

			function fetchVersions() {
				$scope.status.loading = true;

				acpaasportalversionbumperFactory.fetchVersionsForProduct($scope.ngDialogData.item.uuid)
					.then(function(versions) {
						if (!versions.length) {
							return $scope.status.loading = false;
						}

						$scope.versions = acpaasportalversionhelperFactory.parseVersions(versions);

						$scope.minvalue = acpaasportalversionhelperFactory.getMinvalueFromVersions($scope.versions);
						$scope.ngDialogData.version = {
							major: _.get($scope.minvalue, "major", 0),
							minor: _.get($scope.minvalue, "minor", 0),
							patch: _.get($scope.minvalue, "patch", 0),
						};
						$scope.status.valid = acpaasportalversionhelperFactory.validateVersion($scope.ngDialogData.version, $scope.versions);
						$scope.status.loading = false;
					});
			}

			function versionUpdated() {
				$timeout(function() {
					$scope.status.valid = acpaasportalversionhelperFactory.validateVersion($scope.ngDialogData.version, $scope.versions);
				});
			}

			function newVersion() {
				$scope.status.loading = true;

				acpaasportalversionbumperFactory.newVersion({
					type: $scope.ngDialogData.type.label,
					item: $scope.ngDialogData.item.uuid,
				}).then(function(version) {
					notify(true);
					$state.go("pelorus.content.edit", { uuid: version.uuid })
						.then(function() {
							$scope.confirm();
						});
				}, handleError);
			}

			function bumpVersion() {
				$scope.status.loading = true;

				acpaasportalversionbumperFactory.bumpVersion({
					type: $scope.ngDialogData.type.label,
					item: $scope.ngDialogData.item.uuid,
					version: $scope.ngDialogData.version,
					label: $scope.ngDialogData.item.meta.label,
				}).then(function(version) {
					notify(true);
					$scope.confirm();
				}, handleError);
			}

			function notify(success) {
				var message = success ? LabelService.getString("New version saved successfully.") : LabelService.getString("Something went wrong while creating your new version.");

				NotificationService.showNotification(
					message,
					"top",
					success ? "success" : "error",
					7000
				);
			}

			function handleError(err) {
				$scope.status.loading = false;
				notify(false);
			}

			$scope.versionUpdated = versionUpdated;
			$scope.newVersion = newVersion;
			$scope.bumpVersion = bumpVersion;

			init();
		},
	]);


