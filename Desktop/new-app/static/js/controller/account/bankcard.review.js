/*
 *	我的-设置-我的银行卡
 */
var moduleName = 'reviewBankCardControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$promise', function($scope, $promise) {
		$scope.list = [];
		$promise.promiseBase().then(function(data) {
			$scope.list = data[0].withdraw_enable_card_list;
		});
	}]);

})(window);