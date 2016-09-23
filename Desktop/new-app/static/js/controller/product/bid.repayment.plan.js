/*
 *	标的扩展信息-还款计划
 */
var moduleName = 'repaymentPlanControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', function($scope, $schttp, $stateParams) {
		$scope.list = [];
		var path = ($stateParams.nb_type == 2 && 'api/bid') || 'api/debt';
		var option = {
			path: path,
			params: {
				method: 'plan',
				data: {
					nb_id: $stateParams.nb_id
				}
			},
			success: function(data) {
				$scope.list = data;
			}
		};
		$schttp.postAsync(option);
	}]);

})(window);