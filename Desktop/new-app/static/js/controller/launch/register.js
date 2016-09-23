/*
 *	注册
 */
var moduleName = 'registerControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$location', '$state', '$pattern', '$config', '$util', '$promise', function($scope, $schttp, $location, $state, $pattern, $config, $util, $promise) {
		var registerParams = $util.getParams('registerParams');
		$scope.params = {
			mobile: registerParams.mobile || '',
			sms_code: registerParams.sms_code || '',
			password: registerParams.password || '',
			password2: registerParams.password2 || '',
		};
		$scope.mobilePattern = $pattern.mobile;
		$scope.sms_type = '1000';
		//图片验证码
		$scope.verifyCodeSrc = '';
		$scope.verifyCode = '';
		//用户名清空
		$scope.clearUser=function(){
			$scope.params.mobile='';
		}
		//密码相关
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
		//隐私协议切换
		$scope.agree = true;
		$scope.switchAgree = function() {
			$scope.agree = !$scope.agree;
		};	
		
		//注册	
		$scope.submitted = false;	
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			
			var option = {
				path: 'api/user',
				params: {
					method: 'register',
					data: {
						smscode: $scope.params.sms_code,
						mobile: $scope.params.mobile,
						password: $scope.params.password,
						referer: '',
						qr_referer: '',
						url_referrer: localStorage.getItem('url_referrer') || '',
						source: '',
						brand: localStorage.getItem('brandID') || ''
					}
				},
				success: function(data) {
					$util.unsetParams('registerParams');
					$util.setParams('mobile', $scope.params.mobile);
					localStorage.setItem($config.localKey.isLogin, '1');
					$state.go('auth', {fromState:'register'});
					$location.replace();
				}
			};
			$schttp.postAsync(option);
		}
		
		$scope.viewProtocal = function() {
			$util.setParams('registerParams', $scope.params, true);
			$state.go('summary', {type:7});
		};
		
		//切换图片验证码
		$scope.changeVerify = function() {
			$promise.promiseVerify('reg').then(function(data) {
				$scope.verifyCodeSrc = data;
			});
		};			
		
	}]);

})(window);