/*
 *	app升级
 */
var moduleName = 'upgradeControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$util', '$config', function($scope, $util, $config) {
		$scope.download = function() {
			if ($util.isAndroidApp()) {
				windows.location.href = $config.device.androidDownloadUrl;
			}
			if ($util.isIosApp()) {
				windows.location.href = $config.device.iosDownloadUrl;
			}
		}
	}]);

})(window);