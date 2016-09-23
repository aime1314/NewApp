/*
 *	理财-投标-红包选择-红包说明
 */
var moduleName = 'cashExplanationControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', function($scope, $schttp, $stateParams) {
		$scope.nb_id = $stateParams.nb_id;
		$scope.data = {};
		var option = {
			url: 'bid_cash',
			data: {
				k: 'MBidComList'
			},
			success: function(data) {
				$scope.data = data;
			}
		};
		$schttp.load(option);
	}]);

})(window);