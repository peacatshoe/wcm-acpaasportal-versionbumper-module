"use strict";

var _ = require("lodash");

module.exports = function formatVersionSlug(versionLabel, activeLanguages) {
	return activeLanguages.reduce(function(slug, lang) {
		slug[lang] = _.kebabCase(versionLabel);
		return slug;
	}, { multiLanguage: true });
};
