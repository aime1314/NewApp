var moduleName = 'filters';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.filter('html2String', ['$sce', function($sce) {
		return function(html) {
			if (angular.isString(html)) {
				return $sce.trustAsHtml(html);
			}
			return html;
		}
	}]);
})(window);