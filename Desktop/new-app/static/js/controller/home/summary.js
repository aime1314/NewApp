/*
 *	首页-国资背景/资金安全/灵活变现/高收益
 */
var moduleName = 'summaryControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	mainApp.controller(moduleName, ['$scope', '$stateParams', function($scope, $stateParams) {
		$scope.type = $stateParams.type;
		$scope.title = $scope.type == 1 && '国资股东' || 
					   $scope.type == 2 && '保护计划' ||
					   $scope.type == 3 && '平台收益' || 
					   $scope.type == 4 && '资金安全' ||
					   $scope.type == 5 && '平台介绍' ||
					   $scope.type == 6 && '规范运营' ||
					   $scope.type == 7 && '服务协议与隐私条款' ||
					   $scope.type == 8 && '生菜金融用户绑卡协议书' ||
					   $scope.type == 9 && '天天生财三方协议' ||
					   $scope.type == 10 && '天天生财产品规则';
        	}]);

})(window);