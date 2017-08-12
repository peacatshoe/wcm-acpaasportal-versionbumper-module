"use strict";

angular
	.module("acpaasportalversionbumper_0.0.2.factories")
	.factory("acpaasportalversionhelperFactory", [
		function() {
			var factory = {};

			factory.parseVersions = function(versions) {
				return versions.map(function(version) {
					return {
						major: _.get(version, "fields.versionMajor", 0) || _.get(version, "fields.version", 0),
						minor: _.get(version, "fields.versionMinor", 0),
						patch: _.get(version, "fields.versionPatch", 0),
					};
				}).sort(factory.sortVersions);
			}

			factory.getMinvalueFromVersions = function(versions) {
				var last = _.cloneDeep(_.last(versions));

				return last ? _.assign(last, { patch: last.patch + 1 }) : {
					major: 0,
					minor: 0,
					patch: 0,
				};
			}

			factory.sortVersions = function(a, b) {
				var levels = ["major", "minor", "patch"];

				for (var i = 0; i < levels.length; i += 1) {
					var level = levels[i];
					var sorted = factory.sortVersion(a[level], b[level]);

					if (i === levels.length - 1) {
						return sorted;
					}

					if (sorted === 0) {
						continue;
					}

					return sorted;
				}
			};

			factory.sortVersion = function(a, b) {
				if (a > b) {
					return 1;
				}

				if (a < b) {
					return -1;
				}

				return 0;
			};

			factory.validateVersion = function(version, versions) {
				return !_.find(versions, version);
			};

			factory.getValueFromVersions = function(versions, type) {
				var minvalue = factory.getMinvalueFromVersions(versions);
				var currVersion = {
					major: _.get(minvalue, "major", 0),
					minor: _.get(minvalue, "minor", 0),
					patch: _.get(minvalue, "patch", 0),
				};

				if (type.label === "product") {
					currVersion.patch += 1;
				}

				if (type.label === "api") {
					currVersion.major += 1;
				}

				return currVersion;
			};

			return factory;
		},
	]);
