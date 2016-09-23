/*
 *	我的-天天生财
 */
var moduleName = 'ttscAccountControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$state', '$location', function($scope, $schttp, $state, $location) {
		$scope.data = [];
		$scope.index = 0;
		$scope.curData = {
			p_name: '暂无记录',
			uis_avail_balance: 0,
			uis_interest: 0,
			uis_total_income: 0,
			p_id: 0
		};
		var option = {
			path: 'api/ttsc',
			params: {
				method: 'show'
			},
			success: function(data) {
				if (data.length) {
					$scope.data = data;
					_switchData();
				} else {
					$state.go('ttsc', {nb_id: 2});
					$location.replace();
				}
			}
		};
		$schttp.postAsync(option);
		
		$scope.switchData = function() {
			$scope.$apply(function() {
				_switchData();
			});		
		}
		
		function _switchData() {
			$scope.curData = $scope.data[$scope.index];
			_sendBroadCast($scope.curData.p_id);
		}
		
		function _sendBroadCast(p_id) {
			$scope.$broadcast('sendPid', p_id);
		}
		
	}]);

})(window);