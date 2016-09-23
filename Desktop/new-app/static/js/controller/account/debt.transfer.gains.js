/*
 *	我的-散标专区-详情-债权转让-收益计划
 */
var moduleName = 'debtTransferGainsControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', function($scope, $schttp, $stateParams) {
		$scope.list = [];
		var option = {
			path: 'api/user',
			params: {
				method: 'gains',
				data: {
					nbd_id: $stateParams.nbd_id
				}
			},
			success: function(data) {
				$scope.list = data;
			}
		};
		$schttp.postAsync(option);
	}]);

})(window);