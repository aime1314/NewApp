/*
 *	重置登录密码
 */
var moduleName = 'resetLoginPasswordControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$util', '$ui', '$account', '$promise', '$session', '$pattern', function($scope, $schttp, $util, $ui, $account, $promise, $session, $pattern) {
		$scope.mobile = '';
		$scope.mobilePattern = $pattern.mobile;
		$scope.sms_code = '';
		$scope.sms_type = '1002';
		//图片验证码
		$scope.verifyCodeSrc = '';
		$scope.verifyCode = '';		
		//密码相关
		$scope.password = '';
		$scope.password2 = '';
		$scope.loginPasswordPattern = $pattern.loginPassword;
		//密码可见切换
		$scope.passwordShow = false;
		$scope.password2Show = false;
		$scope.passwordSwitch = function() {
			$scope.passwordShow = !$scope.passwordShow;
		};
		$scope.password2Switch = function() {
			$scope.password2Show = !$scope.password2Show;
		};
		
		try {
			$scope.mobile = $util.getParams('mobile');
		} catch (e) {
			$scope.mobile = '';
		}
		
		//重置登录密码
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			var option = {
				path: 'api/user',
				params: {
					method: 'loginReset',
					data: {
						captcha: $scope.sms_code,
						mobile: $scope.mobile,
						new_password: $scope.password
					}
				},
				success: function(data) {
					return $promise.promiseLogoutFn().then(function() {
						$session.reset();
						return $session.promiseSession(true).then(function() {
							$account.logout(true, {fromState:'home'});
						}, function() {
							$account.logout(true, {fromState:'home'});//init失败也重新登录
						});					
					}, function() {
						//尝试登出失败，强制用户登录，同1012处理
						$session.reset();
						return $session.promiseSession(true).then(function() {
							$ui.toastShow('登录密码已重置，请重新登录', 2000);
							$account.logout(true, {fromState:'home'});
						}, function() {
							$account.logout(true, {fromState:'home'});//init失败也重新登录
						});				
					});						
				}
			};
			$schttp.postAsync(option);
		}
		
		//切换图片验证码
		$scope.changeVerify = function() {
			$promise.promiseVerify('reset').then(function(data) {
				$scope.verifyCodeSrc = data;
			});
		};	
	}]);

})(window);