/*
 *	我的-我的流量-转增好友
 */
var moduleName = 'flowHandselControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$location','$promise', '$ui', '$stateParams', '$account', '$util', '$state', '$pattern', function($scope, $schttp,$location, $promise, $ui, $stateParams, $account, $util, $state, $pattern) {
		var total_flow = $scope.total_flow = $util.getParams('total_flow') || 0;
		$scope.user_phone = $util.getParams('mobile');
		$scope.mobile = '';
		$scope.flow = '';
		//手机校验正则
		$scope.mobilePattern = $pattern.mobile;		

		//转赠
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			if ($scope.flow > total_flow) {
				$ui.toastShow('您最多可以转赠'+total_flow+'MB流量', 2000);
				return;					
			}
			if ($scope.flow == '0') {
				$ui.toastShow('转赠流量必须大于0M', 2000);
				return;					
			}

			$promise.promiseLogin().then(function() {
				$promise.promiseAuth().then(function() {
					$promise.promiseCardBind().then(function() {
						if (parseFloat(total_flow) >= parseFloat($scope.flow)) {
							//提取
							goFlow();								
						} else {
							//提取超额
							$ui.toastShow('您最多可以转赠'+total_flow+'MB流量', 2000);
						}							
					}, function() {
						//未绑卡
						$state.go('addBankCard', {fromState:'common'});					
					});					
				}, function() {
					//未认证
					$state.go('auth', {fromState:'common'});	
				});
			}, function() {
				//未登录
				$state.go('login', {fromState:'common',nb_id:nb_id});	
			});				

		};		

		//调用密码弹框
		function goFlow() {
			$ui.confirmPasswordShow('请输入支付密码', '确定', function(password) {
				if (!password) {
					$ui.toastShow('支付密码不能为空，请重新输入', 3000);
				} else if (!$pattern.payPassword.test(password)) {
					$ui.toastShow('支付密码输入错误，请重新输入', 2000);
				} else {
					$schttp.postAsync({
						path: 'api/flow',
						params: {
							method: 'gift',
							data: {
								phone: $scope.mobile,
								flow: $scope.flow,
								password: password	
							}
						},
						success: function(data) {
							$ui.hide();
							$location.path('flow').replace();
						},
						businessError: function() {
							$ui.unlock();
						}
					});
					//$schttp.postAsync(option);
				}
			}, '取消', null, function() {
				$state.go('resetPayPassword', {fromState:'common'});	
			});		
		}
	}]);

})(window);