"use strict";

angular
	.module("acpaasportalversionbumper_0.0.2")
	.provider("acpaasportalversionbumperConfig", [
		function membersConfig() {
			this.API = {
				name: "acpaasportalversionbumper",
				version: "0.0.2",
				basePath: "app/modules/",
			};

			this.API.modulePath = this.API.basePath + this.API.name + "_" + this.API.version + "/";

			this.$get = function get() {
				return this.API;
			};
		},
	]);
