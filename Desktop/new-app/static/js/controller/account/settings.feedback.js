/*
 *	我的-设置-意见反馈-列表
 */
var moduleName = 'feedbackControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', function($scope, $schttp) {
		$scope.list = [];
		var option = {
			path: 'api/feedback',
			params: {
				method: 'lists'
			},
			success: function(data) {
				$scope.list = data;
			}
		};
		$schttp.postAsync(option);
	}]);

})(window);