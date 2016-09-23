/*
 *	标的扩展信息-产品信息-债权转让
 */
var moduleName = 'productInfoTransferControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', function($scope, $schttp, $stateParams) {
		var option = {
			path: 'api/debt',
			params: {
				method: 'product',
				data: {
					nb_id: $stateParams.nb_id
				}
			},
			success: function(data) {
				$scope.data = data;
			}
		};
		$schttp.postAsync(option);
	}]);
	
})(window);