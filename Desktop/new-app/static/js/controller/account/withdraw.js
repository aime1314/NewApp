/*
 *	我的-我要提现
 */
var moduleName = 'withdrawControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$promise', '$ui', '$location', '$schttp', '$pattern', '$state', '$config', function($scope, $promise, $ui, $location, $schttp, $pattern, $state, $config) {
		$scope.mobile = '';
		$scope.amount = '';
		$scope.sms_code = '';
		$scope.sms_type = '2001';
		//图片验证码
		$scope.verifyCodeSrc = '';
		$scope.verifyCode = '';		
		$scope.data = {};
		$scope.balance = '获取中';
		$promise.promiseBase().then(function(data) {
			$scope.data = data[0].withdraw_enable_card_list[0];
			$scope.balance = data[0].ava_balance;
			$scope.mobile = $scope.data.phone;
		});
		
		//是否可发送短信验证码
		$scope.smsSendEnable = function() {
			return !!$scope.amount && !!$scope.mobile;
		};		
		
		//提现
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			$ui.confirmPasswordShow('请输入支付密码', '确定', function(password) {
				if (!password) {
					$ui.toastShow('支付密码不能为空，请重新输入', 2000);
				} else if (!$pattern.payPassword.test(password)) {
					$ui.toastShow('支付密码输入错误，请重新输入', 2000);
				} else {
					var option = {
						path: 'api/withdraw',
						params: {
							method: 'post',
							data: {
								head_bank_code: $scope.data.headBankCode,
								card_code: $scope.data.cardCode,
								head_bank_name: $scope.data.headBankName,
								password: password,
								amount: $scope.amount,
								sms_code: $scope.sms_code
							}
						},
						success: function(data) {
							$ui.hide();
							$state.go('account');
							$location.replace();
						},
						businessError: function() {
							$ui.unlock();
						}
					};
					$schttp.postAsync(option);
				}
			}, '取消', null, function() {
				$state.go('resetPayPassword', {fromState:'withdraw'});
			});
		}
		
		$scope.amountCheck = function() {
			if (parseFloat($scope.amount) > $config.withdraw_fee && parseFloat($scope.balance) >= parseFloat($scope.amount)) {
				return false;
			}
			return true;
		};

		//切换图片验证码
		$scope.changeVerify = function() {
			$promise.promiseVerify('withdraw').then(function(data) {
				$scope.verifyCodeSrc = data;
			});
		};	
		
	}]);

})(window);