/*
 *	天天生财标详情
 */
var moduleName = 'ttscControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', '$account', '$ui', '$state', '$promise', '$pattern', 'numberFilter', function($scope, $schttp, $stateParams, $account, $ui, $state, $promise, $pattern, numberFilter) {
		var p_id = $stateParams.nb_id || '0';
		$scope.is_login = $account.isLogin();
		//tabs
		$scope.tabIndex = 0;
		$scope.showTab = function(index) {
			if ($scope.tabIndex == index)
				return;
			$scope.tabIndex = index;
		};
		
		//余额查询
		$scope.balance = '';
		$promise.promiseBase().then(function(data) {
			$scope.balance = data[0].ava_balance;
		});	

		//隐私协议切换
		$scope.agree = true;
		$scope.switchAgree = function() {
			$scope.agree = !$scope.agree;
		};	

		$scope.bid_amount = '';
		$scope.bidEnable = false;
		//获取天天生财详情
		var option = {
			path: 'api/ttsc',
			params: {
				method: 'get',
				data: {
					p_id: p_id
				}
			},
			success: function(data) {
				$scope.data = data;
				$scope.bidEnable = parseInt(data.amount) > 0;
			}
		};
		$schttp.postAsync(option);
		
		//执行抢标、投标等一系列操作
		$scope.submit = function() {
			if ($scope.submitForm.$invalid || !$scope.agree) {
				return;
			}		
			if (parseFloat($scope.data.invest_min) > parseFloat($scope.bid_amount)) {
				$ui.toastShow('起投金额为'+$scope.data.invest_min+'元，请重新输入投资金额', 3000);
				return;
			}
			$promise.promiseLogin().then(function() {
				$promise.promiseAuth().then(function() {
					$promise.promiseCardBind().then(function() {
						$promise.promiseBase().then(function(data) {
							if (parseFloat(data[0].ava_balance) >= parseFloat($scope.bid_amount)) {
								//投标
								goBid();									
							} else {
								//余额不足
								$ui.alertShow2('余额不足', '您当前账户余额'+data[0].ava_balance+'元，若要投资'+$scope.bid_amount+'元，请先充值。', '去充值', function() {
									$state.go('recharge');
								}, '取消', null);								
							}
						});
					}, function() {
						//未绑卡
						$state.go('addBankCard', {fromState:'ttsc'});
					});					
				}, function() {
					//未认证
					$state.go('auth', {fromState:'ttsc'});
				});		
			}, function() {
				//未登录
				$state.go('login', {fromState:'ttsc',nb_id:p_id});
			});				
		};
		
		//投标
		function goBid() {
			$ui.confirmPayShow('请输入支付密码', '确定', function(password) {
				if (!password) {
					$ui.toastShow('支付密码不能为空，请重新输入', 3000);
				} else if (!$pattern.payPassword.test(password)) {
					$ui.toastShow('支付密码输入错误，请重新输入', 2000);
				} else {
					option = {
						path: 'api/ttsc',
						params: {
							method: 'bidpay',
							data: {
								password: password,
								p_id: p_id,
								amount: $scope.bid_amount								
							}
						},
						success: function(data) {
							$ui.hide();
							$state.go('ttscAccount.ttscIncome');
						},
						businessError: function() {
							$ui.unlock();
						}
					};
					$schttp.postAsync(option);
				}
			}, '取消', null, function() {
				$state.go('resetPayPassword', {fromState:'ttsc',nb_id:p_id});
			}, numberFilter($scope.bid_amount));		
		}

		//登录
		$scope.login = function() {
			$state.go('login', {fromState:'ttsc',nb_id:p_id});
		};	
		
	}]);
	
})(window);