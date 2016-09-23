/*
 *	我的
 */
var moduleName = 'accountControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$util', '$state', '$promise', function($scope, $schttp, $util, $state, $promise) {
		$scope.data = {};
		var option = {
			path: 'api/user',
			params: {
				method: 'assets'
			},
			success: function(data) {
				$scope.data = data;
				$util.setParams('mobile', data.mobile);
				//$util.setParams('reco_code', data.reco_code);
			}
		};
		$schttp.load(option);
		
		//充值
		$scope.recharge = function() {
			$promise.promiseLogin().then(function() {
				$promise.promiseAuth().then(function() {
					$promise.promiseCardBind().then(function() {
						$state.go('recharge');							
					}, function() {
						//未绑卡
						$state.go('addBankCard', {fromState:'account'});
					});					
				}, function() {
					//未认证
					$state.go('auth', {fromState:'account'});
				});
			}, function() {
				//未登录
				$state.go('login', {fromState:'account'});
			});	
		};
		
		//提现
		$scope.withdraw = function() {
			$promise.promiseLogin().then(function() {
				$promise.promiseAuth().then(function() {
					$promise.promiseCardBind().then(function() {
						$state.go('withdraw');							
					}, function() {
						//未绑卡
						$state.go('addBankCard', {fromState:'account'});
					});					
				}, function() {
					//未认证
					$state.go('auth', {fromState:'account'});
				});
			}, function() {
				//未登录
				$state.go('login', {fromState:'account'});
			});	
		};


		//汇付余额查询
		function _remiTance() {
			var option = {
				path: 'api/user',
				params: {
					method: 'remittance'
				},
				success: function(data) {
					$scope.status = data.status;
				}
			};
			$schttp.postAsync(option);
		}
		_remiTance();
		
	}]);

})(window);