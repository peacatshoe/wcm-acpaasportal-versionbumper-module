"use strict";

angular
	.module("acpaasportalversionbumper_0.0.10.controllers")
	.controller("acpaasportalversionbumperModalController", [
		"$scope",
		"$timeout",
		"$state",
		"$q",
		"acpaasportalversionbumperFactory",
		"acpaasportalversionhelperFactory",
		"NotificationService",
		"LabelService",

		function(
			$scope,
			$timeout,
			$state,
			$q,
			acpaasportalversionbumperFactory,
			acpaasportalversionhelperFactory,
			NotificationService,
			LabelService
		) {
			$scope.status = {
				loading: true,
				bumping: false,
				valid: false,
				hasVersions: false,
			};
			$scope.versions = [];

			function init() {
				$scope.status.loading = true;

				fetchVersions($scope.ngDialogData.type)
					.then(function(versions) {
						if ($scope.ngDialogData.type.label === "product") {
							$scope.versions = acpaasportalversionhelperFactory.parseVersions(versions);
						} else {
							$scope.versions = [_.cloneDeep($scope.ngDialogData.version)];
						}

						$scope.status.hasVersions = $scope.versions.length;
						$scope.ngDialogData.version = acpaasportalversionhelperFactory.getValueFromVersions($scope.versions, $scope.ngDialogData.type);
						$scope.status.valid = acpaasportalversionhelperFactory.validateVersion($scope.ngDialogData.version, $scope.versions);
						$scope.status.loading = false;
					});
			}

			function fetchVersions(type) {
				switch (type.label) {
					case "product":
						return acpaasportalversionbumperFactory.fetchVersionsForProduct($scope.ngDialogData.item.uuid);
					default:
						return $q.resolve();
				}
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
					item: $scope.ngDialogData.item,
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
					item: $scope.ngDialogData.item,
					version: $scope.ngDialogData.version,
					label: $scope.ngDialogData.item.meta.label,
				}).then(function() {
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

			function handleError() {
				$scope.status.loading = false;
				notify(false);
			}

			$scope.versionUpdated = versionUpdated;
			$scope.newVersion = newVersion;
			$scope.bumpVersion = bumpVersion;

			init();
		},
	]);


