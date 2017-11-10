"use strict";

angular
	.module("acpaasportalversionbumper_1.0.0.controllers")
	.controller("acpaasportalversionbumperOverviewController", [
		"$scope",
		"$timeout",
		"$q",
		"acpaasportalversionbumperFactory",
		"acpaasportalversionbumperConfig",
		"LabelService",
		"DialogService",

		function(
			$scope,
			$timeout,
			$q,
			acpaasportalversionbumperFactory,
			acpaasportalversionbumperConfig,
			LabelService,
			DialogService
		) {
			$scope.filters = {
				type: "",
				product: "",
				api: "",
				searchQuery: "",
			};
			$scope.types = [];
			$scope.loading = {
				types: false,
				table: false,
				search: false,
			};
			$scope.products = [];
			$scope.apis = [];
			$scope.tableData = [];
			$scope.searchFieldOptions = {
				debounce: 150,
			};
			$scope.pagination = {
				currentPage: 0,
				itemsPerPage: 10,
				async: false,
				itemsLength: 0,
			};
			$scope.tableConfig = {
				pagination: $scope.pagination,
				selects: [],
				searchField: {
					enabled: false,
				},
				columns: [{
					columnName: LabelService.getString("Name"),
					key: "meta.label",
					sortable: true,
				}, {
					columnName: LabelService.getString("Description"),
					key: "meta.description",
					sortable: true,
				}, {
					columnName: LabelService.getString("Author"),
					key: "meta.lastEditor.user",
				}, {
					columnName: LabelService.getString("Last edit"),
					key: "meta.lastModified",
					mode: "timeAgo",
					defaultSort: true,
					sortable: true,
				}, {
					columnName: LabelService.getString("Actions"),
					template: "<a ng-click=\"$emit('bumpVersion', i)\">" + LabelService.getString("Bump") + "</a>",
				}],
			};

			function init() {
				fetchTypes();
			}

			function fetchTypes() {
				$scope.loading.types = true;
				acpaasportalversionbumperFactory.fetchTypes()
					.then(function(types) {
						$scope.types = types;
						$scope.loading.types = false;
					});
			}

			function fetchType(type) {
				switch (type.label) {
					case "product":
						return acpaasportalversionbumperFactory.fetchProducts();
					case "api":
						return acpaasportalversionbumperFactory.fetchApis();
					default:
						return $q.reject();
				}
			}

			function fetchItemsForType(type) {
				$scope.loading.table = true;

				fetchType(type)
					.then(function(items) {
						$scope[type] = items;
						$scope.tableData = filterItems(items, $scope.filters, type);
						$scope.pagination.itemsLength = items.length;
						$scope.loading.table = false;
					}, function() {
						$scope.loading.table = false;
					});
			}

			function filterItems(items, options) {
				return items.filter(function(item) {
					if (!options.searchQuery) {
						return true;
					}

					if (_.get(item, "meta.label", "").toLowerCase().indexOf(options.searchQuery.toLowerCase()) >= 0) {
						return true;
					}

					if (_.get(item, "meta.description", "").toLowerCase().indexOf(options.searchQuery.toLowerCase()) >= 0) {
						return true;
					}

					return false;
				});
			}

			function searchItems(type) {
				$scope.loading.search = true;
				$scope.tableData = filterItems($scope[type], $scope.filters);

				$timeout(function() {
					$scope.loading.search = false;
				}, 500);
			}

			function bumpVersion(event, item) {
				var modalData = {
					type: _.cloneDeep($scope.filters.type),
					item: _.cloneDeep(item),
					version: {
						major: _.get(item, "fields.version", 0),
						minor: 0,
						patch: 0,
					},
				};

				DialogService.openModal({
					templateUrl: acpaasportalversionbumperConfig.modulePath + "views/versionModal.tpl.html",
					data: modalData,
					controller: "acpaasportalversionbumperModalController",
				}).then(function() {
					fetchItemsForType($scope.filters.type);
				});
			}

			$scope.fetchItemsForType = fetchItemsForType;
			$scope.searchItems = searchItems;

			$scope.$on("bumpVersion", bumpVersion);

			init();
		},
	]);
