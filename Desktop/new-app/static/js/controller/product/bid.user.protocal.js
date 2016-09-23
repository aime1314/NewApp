/*
 *	标的扩展信息-用户协议主controller
 */
var moduleName = 'userProtocalControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', function($scope, $schttp, $stateParams) {
		$scope.tabContent = '';
		$scope.tabIndex = 0;
		$scope.showTab = function(index) {
			if (index == $scope.tabIndex)
				return;
			$scope.tabIndex = index;
			bindTabContent();
		};
		var option = {
			path: 'api/bid',
			params: {
				method: 'agreement',
				data: {
					nb_id: $stateParams.nb_id
				}
			},
			success: function(data) {
				$scope.data = data;
				bindTabContent();
			}
		};
		$schttp.postAsync(option);
		
		function bindTabContent() {
			if ($scope.data)
				$scope.tabContent = $scope.data[$scope.tabIndex].content;	
		}
	}]);

})(window);