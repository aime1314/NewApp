/*
 *	我的-资产详情
 */
var moduleName = 'assetsDetailControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$util', '$schttp', function($scope, $util, $schttp) {
		$scope.mobile = $util.getParams('mobile');
		$scope.data = {};
		var option = {
			path: 'api/user',
			params: {
				method: 'detail'
			},
			success: function(data) {
				$scope.data = data;
			}
		};
		$schttp.postAsync(option);		
	}]);

})(window);