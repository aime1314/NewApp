/*
 *	更多
 */
var moduleName = 'moreControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$util', '$config', '$native', '$ui', function($scope, $util, $config, $native, $ui) {
		$scope.hot_line = $config.hot_line;
		$scope.dialEnable = !$util.isOtherDevice;
		//拨打电话
		$scope.dial = function() {
			if (!$scope.dialEnable)
				return;
			$ui.alertShow2('提示', $scope.hot_line, '拨打', function() {
		        var option = {
		            cmd: $config.cmd.dial,
		            key: $config.cmd.dial,
		            value: $scope.hot_line
		        };		
				$native.callNative(option);				
			}, '取消', null);
		};
	}]);

})(window);