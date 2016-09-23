var moduleName = 'schttp';
module.exports = moduleName;

(function(win) {
	
	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.service('$schttp', ['$rootScope', '$http', '$util', '$config', '$session', '$native', '$account', '$ui', '$q',
		function($rootScope, $http, $util, $config, $session, $native, $account, $ui, $q) {
		//先检查session_id，如果没有先获取session_id
		this.threads = [];//请求队列
		this.flag = true;
		this.reset = function() {
			this.flag = true;
			this.threads = [];
		};
		
		this.postAsync = function(options) {
			if (sessionStorage.getItem($config.sessionKey.online) == '0') return;
			if (angular.isArray(options))
				Array.prototype.push.apply(this.threads, options);
			else
				this.threads.push(options);
				
			if (this.flag) {
				var option = this.threads.shift();
				if (option)
					return _postAsync(option);				
			}
			this.flag = false;
			$rootScope.$on('nextThread', function() {
				var option = this.threads.shift();
				if (option)
					return _postAsync(option);
				else 
					this.flag = true;
			});
		};
		
		function _postAsync(options) {
			var path = options.path || '',
				params = options.params || {},
				config = options.config || {};
			return $session.promiseSession().then(function() {
				return $http.post($util.getRequestUrl(path), $util.seriesRequestData(params), config).
					success(function(data) {
						$rootScope.$broadcast('nextThread');//执行下一个网络任务
						_successResponseResolve(data, options);
					}).error(function(data) {
						$rootScope.$broadcast('nextThread');//执行下一个网络任务
						if (angular.isFunction(options.error))
							options.error.apply(this, data);
						else
							$ui.toastShow($config.errMsg.serverErr, 3000);
					});
			});		
		}
		
		this.getAsync = function(options) {
			if (sessionStorage.getItem($config.sessionKey.online) == '0') return;
			if (angular.isArray(options)) {
				while (options.length) {
					var option = options.shift();
					this.getAsync(option);
				}
			} else {
				var path = options.path || '',
					params = options.params || {}, 
					config = options.config || {};
				return $session.promiseSession().then(function() {
					return $http.get($util.getRequestUrl(path), $util.seriesRequestData(params), config).
						success(function(data) {
							_successResponseResolve(data, options);
						}).error(function(data) {
							if (angular.isFunction(options.error))
								options.error.apply(this, data);
							else
								$ui.toastShow($config.errMsg.serverErr, 3000);
						});
				});
			}	
		};
		
		function _successResponseResolve(response, options) {
			switch (response.code) {
				case $config.code.success:
					if (angular.isFunction(options.success)) {
						//发图片验证码不重写token
						//if (options.path.indexOf('api/code') == -1)
						localStorage.setItem($config.localKey.token, response.data.token);
						//网络数据成功获取后复写app缓存数据
						if (angular.isDefined(options.native_cache)) {
							var params = {
								cmd: $config.cmd.write,
								key: options.path,
								value: response.data.result
							};
							$native.deferNative(params);						
						}
						//显示message
						if (response.data.tips != '')
							$ui.toastShow(response.data.tips, 2000);
						//执行回调	
						options.success.call(this, response.data.result);
					}
					break;
				case $config.code.verifyCode://1010显示图片验证码
					if (angular.isFunction(options.verifyCode)) {
						options.verifyCode.call(this, {});						
					}
					break;
				//错误请求处理
				case $config.code.forceLogin://1012强制重新登录处理
					$session.reset();
					return $session.promiseSession().then(function() {
						$account.logout(true, {fromState: 'home'});
					}, function() {
						$account.logout(true, {fromState: 'home'});//init失败也重新登录
					});	
					break;
				case $config.code.loginPasswordWrong://3020登录密码错误，提示还剩x次
					localStorage.setItem($config.localKey.token, response.data.token);
					if (angular.isFunction(options.loginPasswordWrong)) {
						options.loginPasswordWrong.call(this, {msg:response.msg});	
					}
					break;
				default:
					if (response.msg == '')
						$ui.toastShow($config.errMsg.serverErr, 3000);
					else
						$ui.toastShow(response.msg, 2000);
					//回调业务处理错误
					localStorage.setItem($config.localKey.token, response.data.token);
					if (angular.isFunction(options.businessError)) {
						options.businessError.call(this, {});	
					}
					break;
			}		
		}
		
		//页面初始化，先读缓存，后请求server 
		this.load = function(options) {
			if (!$util.isApp()) {
				this.postAsync(options);
				return;
			}
			if (angular.isArray(options)) {
				while (options.length) {
					var option = options.shift();
					this.load(option);
				}
			} else {
				options.method = options.method || 'post';
				var params = {//优先请求原生App缓存数据
					cmd: $config.cmd.read,
					key: options.path,
					value: {},
					callback: options.success
				};
				//在正式的网络请求发送之前，尝试从app缓存中捞取数据
				var deferredApp = $native.deferNative(params);
				if (sessionStorage.getItem($config.sessionKey.online) == '0') return;
				options['native_cache'] = true;
				if (options.method == 'post')
					this.postAsync(options).then(function() {
						deferredApp.reject();//服务端响应则不执行缓存app的回调
					});
				else 
					this.getAsync(options).then(function() {
						deferredApp.reject();//服务端响应则不执行缓存app的回调
					});
			}
		};
		
		//图片验证码网络请求
		this.postVerify = function(options) {
			if (sessionStorage.getItem($config.sessionKey.online) == '0') return;
			var path = options.path || '',
				params = options.params || {},
				config = options.config || {};
			return $session.promiseSession().then(function() {
				return $http.post($util.getRequestUrl(path), $util.seriesRequestData(params), config).
					success(function(data) {
						//执行回调	
						options.success.call(this, data);
					}).error(function(data) {
						if (angular.isFunction(options.error))
							options.error.apply(this, data);
						else {
							$ui.toastShow($config.errMsg.serverErr, 3000);
						}
					});
			});
		};
		
	}]);
	
})(window);