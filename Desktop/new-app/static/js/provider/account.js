var moduleName = 'account';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.provider('$account', function() {
		return {	
			$get: ['$rootScope', '$location', '$config', '$state', function($rootScope, $location, $config, $state) {
				var stateParams = {};	
				var obj = {
					//登录，登录后跳转
					login: function(state_params) {
						localStorage.setItem($config.localKey.isLogin, 1);
						stateParams = state_params;
						_loginHide();
						//$rootScope.$broadcast($config.emit.loginSuccess);
					},
					//退出登录
					logout: function(showLogin, state_params) {
						localStorage.setItem($config.localKey.isLogin, 0);
						if ($location.url().indexOf('login') > -1) 
							return
						//$rootScope.$broadcast($config.emit.logoutSuccess);
						showLogin = showLogin === true;
						if (showLogin) {
							stateParams = state_params || {};
							_loginShow();
						} else {
							$location.path('home');
						}
					},
					isLogin: function() {
						var is_login = localStorage.getItem($config.localKey.isLogin) || 0;
						return !!parseInt(is_login);
					},
					resolve: function(state_params) {
						//localStorage.setItem($config.localKey.isAuth, '2');
						stateParams = state_params;		
						_loginHide();				
					},
					loginShow: _loginShow,
					loginHide: _loginHide
				};
				
				//显示登录页面
				function _loginShow() {
					$state.go('login', {fromState:stateParams.fromState});
					//如果是从账户中心相关页面进入的登录页，不允许回退
					if (stateParams.fromState.indexOf('account') > -1) 
						$location.replace();
				}
				
				//隐藏登录页面
				function _loginHide() {
					var fromState = stateParams.fromState || 'home';
					delete stateParams.fromState;
					$state.go(fromState, stateParams);
					sessionStorage.setItem('backNum', '-2');
					$location.replace();
				}	
						
				return obj; 
			}]//$get end
		}//return end
	});

})(window);