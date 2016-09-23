/*
 *	我的-我的流量-余额充值到流量
 */
var moduleName = 'flowRechargeControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$ui', '$location', function($scope, $schttp, $ui, $location) {
		$scope.flow = '';
		
		$scope.submitEnable = function() {
			return !!$scope.mobile && !!$scope.flow;
		};
		
		$scope.submit = function() {
			if (!$scope.mobile || !$scope.flow) {
				$ui.toastShow($config.errMsg.paramsMissing, 2000);
				return;		
			}
			var option = {
				path: 'api/flow',
				params: {
					method: 'gift',
					data: {
						phone: $scope.mobile,
						flow: $scope.flow
					},
					success: function() {
						$location.path('flow').replace();
					}
				}
			};
			$schttp.postAsync(option);
		};		
	}]);

})(window);