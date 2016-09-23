/*
 *	我的-设置
 */
var moduleName = 'settingsControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$promise', '$util', '$state', function($scope, $promise, $util, $state) {
		$scope.mobile = $util.getParams('mobile');
		//是否认证
		$scope.is_auth = false;
		$scope.auth_status_desc = '获取中';
		$promise.promiseAuth().then(function() {
			$scope.is_auth = true;
			$scope.auth_status_desc = '已认证';
		}, function() {
			$scope.auth_status_desc = '未认证';
		});
		//认证
		$scope.auth = function() {
			if ($scope.is_auth)
				return;
			$state.go('auth', {fromState: 'settings'});
		};
		
		$scope.is_card_bind = false;
		$scope.card_num_desc = '获取中';
		//绑卡情况
		$promise.promiseCardBind().then(function(data) {
			$scope.is_card_bind = true;
			$scope.card_num_desc = data+'张';
		}, function() {
			$scope.card_num_desc = '请添加';
		});
		//绑卡
		$scope.addBankCard = function() {
			if ($scope.is_card_bind) {
				$state.go('reviewBankCard');		
			} else {
				if ($scope.is_auth)
					$state.go('addBankCard', {fromState:'settings'});
				else
					$state.go('auth', {fromState:'settings'});
			}	
		};
		
		//我的邀请码
		$scope.inviation_code = '';
		$promise.promiseBase().then(function(data) {
			$scope.inviation_code = data[0].inviation_code;
		});
		
		//退出登录
		$scope.logout = $promise.logout;
	}]);

})(window);