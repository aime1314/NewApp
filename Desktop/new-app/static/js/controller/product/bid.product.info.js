/*
 *	标的扩展信息-产品信息
 */
var moduleName = 'productInfoControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', function($scope, $schttp, $stateParams) {
		$scope.tabList = [];
		$scope.tabIndex = 0;
		$scope.showTab = function(index) {
			if (index == $scope.tabIndex)
				return;
			$scope.tabIndex = index;
			bindTabList();
		};
		var option = {
			path: 'api/bid',
			params: {
				method: 'product',
				data: {
					nb_id: $stateParams.nb_id
				}
			},
			success: function(data) {
				$scope.data = data;
				bindTabList();
			}
		};
		$schttp.postAsync(option);
		
		function bindTabList() {
			if ($scope.data.list)
				$scope.tabList = $scope.data.list[$scope.tabIndex].data;	
		}
	}]);

})(window);