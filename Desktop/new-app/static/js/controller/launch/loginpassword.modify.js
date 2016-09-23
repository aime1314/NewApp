/*
 *	修改登录密码
 */
var moduleName = 'modifyLoginPasswordControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$util', '$ui', '$account', '$promise', '$session', '$pattern', function($scope, $schttp, $util, $ui, $account, $promise, $session, $pattern) {
		$scope.mobile = '';
		$scope.mobilePattern = $pattern.mobile;
		$scope.sms_code = '';
		$scope.sms_type = '1004';
		//图片验证码
		$scope.verifyCodeSrc = '';
		$scope.verifyCode = '';		
		//密码相关
		$scope.oldpassword = '';
		$scope.password = '';
		$scope.password2 = '';
		$scope.loginPasswordPattern = $pattern.loginPassword;
		//密码可见切换
		$scope.oldPasswordShow = false;
		$scope.passwordShow = false;
		$scope.password2Show = false;
		$scope.oldPasswordSwitch = function() {
			$scope.oldPasswordShow = !$scope.oldPasswordShow;
		};
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
		
		//修改登录密码
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			var option = {
				path: 'api/user',
				params: {
					method: 'change',
					data: {
						captcha: $scope.sms_code,
						mobile: $scope.mobile,
						old_password: $scope.oldpassword,
						new_password: $scope.password
					}
				},
				success: function() {
					return $promise.promiseLogoutFn().then(function() {
						$session.reset();
						$ui.toastShow('登录密码已修改，请重新登录', 2000);
						return $session.promiseSession(true).then(function() {
							$account.logout(true, {fromState:'account'});
						}, function() {
							$account.logout(true, {fromState:'account'});//init失败也重新登录
						});					
					}, function() {
						//尝试登出失败，强制用户登录，同1012处理
						$session.reset();
						$ui.toastShow('登录密码已修改，请重新登录', 2000);
						return $session.promiseSession(true).then(function() {
							$account.logout(true, {fromState:'account'});
						}, function() {
							$account.logout(true, {fromState:'account'});//init失败也重新登录
						});				
					});						
				}
			};
			$schttp.postAsync(option);
		}
		
		//切换图片验证码
		$scope.changeVerify = function() {
			$promise.promiseVerify('change').then(function(data) {
				$scope.verifyCodeSrc = data;
			});
		};			
	}]);

})(window);