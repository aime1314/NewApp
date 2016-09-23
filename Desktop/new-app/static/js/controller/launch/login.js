/*
 *	登录
 */
var moduleName = 'loginControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$account', '$pattern', '$util', '$location', '$state', '$stateParams', '$ui', function($scope, $schttp, $account, $pattern, $util, $location, $state, $stateParams, $ui) {
		if (!$util.getParams('routerParams'))
			$util.setParams('routerParams', $stateParams, true);
		
		$scope.mobilePattern = $pattern.mobile;
		$scope.mobile = '';
		$scope.password = '';
		$scope.loginPasswordPattern = $pattern.loginPassword;
		$scope.data = {};
		
		//用户名清空
		$scope.clearUser = function(){
			$scope.mobile = '';
		};
		
		//登录
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			if ($scope.verifyCodeSrc !='' && $scope.verifyCode=='') {
				$ui.toastShow('请输入图片验证码');
				return;
			}
			var option = {
				path: 'api/user',
				params: {
					method: 'login',
					data: {
						mobile: $scope.mobile,
						password: $scope.password
					}
				},
				success: function(data) {
					$account.login($util.getParams('routerParams'));
					$util.unsetParams('routerParams');
				},
				loginPasswordWrong: function(data) {
					//确认框
					$ui.alertShow2('登录失败', data.msg, '找回密码', function() {
						$state.go('resetLoginPassword');		
					}, '取消', null);
				}
			};
			$schttp.postAsync(option);
		}

		//返回处理
		$scope.back = function() {
			var stateParams = angular.copy($util.getParams('routerParams'));
			$util.unsetParams('routerParams');
			$util.unsetParams('registerParams');
			if (stateParams.fromState.indexOf('account') > -1) {
				$state.go('home');
			} else {
				var fromState = stateParams.fromState;
				delete stateParams.fromState;
				$state.go(fromState, stateParams);
			}
			$location.replace();
		};
		
	}]);

})(window);