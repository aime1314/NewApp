/*
 *	我的-设置-意见反馈-意见详情
 */
var moduleName = 'feedbackDetailControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', function($scope, $schttp, $stateParams) {
		$scope.data = {};
		var option = {
			path: 'api/feedback',
			params: {
				method: 'get',
				data: {
					cid: $stateParams.c_id
				}
			},
			success: function(data) {
				$scope.data = data[0];
			}
		};
		$schttp.postAsync(option);
	}]);

})(window);