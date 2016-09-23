/*
 *	我的-我的流量
 */
var moduleName = 'flowControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$util', function($scope, $schttp, $util) {
		var option = {
			path: 'api/flow',
			params: {
				method: 'get'
			},
			success: function(data) {
				$scope.data = data;
				$util.setParams('total_flow', data.total_flow);
			}
		};
		$schttp.postAsync(option);
	}]);

})(window);