/*
 *	债转标详情
 */
var moduleName = 'commonTransferControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$promise', '$ui', '$stateParams', '$account', '$util', '$state', '$pattern', '$location', 'numberFilter', function($scope, $schttp, $promise, $ui, $stateParams, $account, $util, $state, $pattern, $location, numberFilter) {
		var nb_id = $stateParams.nb_id || 0;
		$scope.bid_amount = '';
		$scope.is_login = $account.isLogin();
		$scope.pay_amount = 0.00;
		$scope.expect_interest = 0.00;	
		
		//获取标的详情
		$scope.data = {};
		var option = {
			path: 'api/debt',
			params: {
				method: 'get',
				data: {
					nb_id: nb_id
				}
			},
			success: function(data) {
				$scope.data = data;
			}
		};
		$schttp.postAsync(option);
		
		//余额查询
		$scope.balance = '';
		$promise.promiseBase().then(function(data) {
			$scope.balance = data[0].ava_balance;
		});
		
		//全投
		$scope.allIn = function() {
			if ($scope.balance == '')
				$scope.bid_amount = $scope.data.left_amount;
			else {
				if (parseFloat($scope.balance) > parseFloat($scope.data.left_amount))
					$scope.bid_amount = $scope.data.left_amount;
				else
					$scope.bid_amount = $scope.balance;
			}		
			_expect($scope.bid_amount);
		};
		
		//执行抢标、投标等一系列操作
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				return;
			}		
			if (parseFloat($scope.data.min_amount) > parseFloat($scope.bid_amount)) {
				$ui.toastShow('起投金额为'+$scope.data.min_amount+'元，请重新输入投资金额', 3000);
				return;
			}
			$promise.promiseLogin().then(function() {
				$promise.promiseAuth().then(function() {
					$promise.promiseCardBind().then(function() {
						if (parseFloat($scope.balance) >= parseFloat($scope.bid_amount)) {
							//投标
							goBid();	
						} else {
							//余额不足
							$ui.alertShow2('余额不足', '您当前账户余额'+$scope.balance+'元，若要投资'+$scope.bid_amount+'元，请先充值。', '去充值', function() {
								$state.go('recharge');
							}, '取消', null);								
						}
					}, function() {
						//未绑卡
						$state.go('addBankCard', {fromState:'commonTransfer'});
					});					
				}, function() {
					//未认证
					$state.go('auth', {fromState:'commonTransfer'});
				});
			}, function() {
				//未登录
				$state.go('login', {fromState:'commonTransfer',nb_id:nb_id});
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
						path: 'api/debt',
						params: {
							method: 'bidpay',
							data: {
								password: password,
								nb_id: nb_id,
								amount: $scope.bid_amount
							}
						},
						success: function(data) {
							$ui.hide();
							$state.go('invest.backsection', {});
						},
						businessError: function() {
							$ui.unlock();
						}
					};
					$schttp.postAsync(option);
				}
			}, '取消', null, function() {
				$state.go('resetPayPassword', {fromState:'commonTransfer',nb_id:nb_id});
			}, numberFilter($scope.bid_amount));
		}
		
		//红包
		$scope.scc_id = $util.getParams('scc_id');
		$scope.upbd_id = $util.getParams('upbd_id');
		$scope.bonus_amount = $util.getParams('bonus_amount');
		$scope.pick = function() {
			if (!$scope.bid_amount) {
				$ui.toastShow('请输入投标金额');
				return;
			}
			if (!$scope.data.nb_id) {
				$ui.toastShow('您当前状态无法使用红包');
				return;			
			}
			$state.go('bidCash', {nb_id:$scope.data.nb_id,bid_amount:$scope.bid_amount});
		};	

		//登录
		$scope.login = function() {
			$state.go('login', {fromState:'commonTransfer',nb_id:nb_id});
		};	

		//预期收益	
		$scope.expectInterest = function() {
			_expect($scope.bid_amount);
 		};

 		function _expect(bidamount) {
			var interest=($scope.bid_amount / $scope.data.appr_amount) * $scope.data.wait_income;
			if (bidamount == '' || ! bidamount) {
 				$scope.expect_interest = 0.00;
 			} else {
 				$scope.expect_interest = interest.toFixed(2);
 			}
 		}	
		
	}]);

})(window);