/*
 *	我的-我的投资-流标详情
 */
var moduleName = 'bustDetailControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', function($scope, $schttp, $stateParams) {
		$scope.data = {};
		var option = {
			path: 'api/invest',
			params: {
				method: 'flow',
				data: {
					nbd_id: $stateParams.nbd_id
				}
			},
			success: function(data) {
				$scope.data = data;
			}
		};
		$schttp.postAsync(option);
		
	}]);

})(window);