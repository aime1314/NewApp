/*
 *	首页-系统公告-详情
 */
var moduleName = 'placardDetailControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$stateParams', '$schttp', function($scope, $stateParams, $schttp) {
		$scope.data = {};
		var option = {
			path: 'api/news',
			params: {
				method: 'detail',
				data: {
					hp_id: $stateParams.hp_id
				}
			},
			success: function(data) {
				$scope.data = data;
			}
		};
		$schttp.postAsync(option);
	}]);

})(window);