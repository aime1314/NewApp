var moduleName = 'session';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.provider('$session', function() {
		return {
			$get: ['$rootScope', '$http', '$config', '$q', '$util', function($rootScope, $http, $config, $q, $util) {
				var statusObj = $config.session.status,
					requestCount = 0,
					deferred = $q.defer();
				var obj = {
					promiseSession: _getSession,
					reset: _reset
				};
				function _getSession(resetDefer) {
					if (resetDefer)
						deferred = $q.defer();//必须重新初始化
					var status = sessionStorage.getItem($config.sessionKey.sessionStatus) || statusObj.noRequest;
					if (sessionStorage.getItem($config.sessionKey.online) == '0') {
						_timeout();
					} else {
						if (angular.equals(status, statusObj.noRequest) || angular.equals(status, statusObj.timeout)) {
							_sendRequest();
						} else if (angular.equals(status, statusObj.success)) {
							var _sessionId = localStorage.getItem($config.localKey.sessionId) || '',
								_token = localStorage.getItem($config.localKey.token) || '';
							if (!_sessionId || !_token)
								_sendRequest();
							else
								deferred.resolve();
						}
					}
					return deferred.promise;
				}
				
				function _sendRequest() {
					var option = {
						path: 'api/init',
						params: {
							method: 'init'
						}
					};
					var conf = {
						timeout: 1000 * 2
					};
					//此处不能使用network服务，因为network服务没有装配完成（依赖于当前的$session）
					$http.post($util.getRequestUrl(option.path), $util.seriesRequestData(option.params), conf).
						success(function(data) {
							if (data && data.code == 0 && data.data && data.data.session_id && data.data.token) {
								if (data.data.tips != '')
									$ui.toastShow(response.data.tips, 2000);
								_setSession(data.data.session_id, data.data.token, data.data.is_login);
							} else {
								_timeout();
							}
						}).error(function() {
							requestCount ++;
							//请求次数超过限制也认为服务异常
							if (requestCount > $config.session.maxRequest) 
								_timeout();
							else 
								_sendRequest();
						});
					_setStatus(statusObj.processing);
				}
				
				function _timeout() {
					_setStatus(statusObj.timeout);
					deferred.reject();				
				}
				
				function _setSession(sessionId, token, isLogin) {
					localStorage.setItem($config.localKey.sessionId, sessionId);
					localStorage.setItem($config.localKey.token, token);
					localStorage.setItem($config.localKey.isLogin, isLogin);
					_setStatus(statusObj.success);
					requestCount = 0;
					deferred.resolve();
				}
				
				function _setStatus(state) {
					sessionStorage.setItem($config.sessionKey.sessionStatus, state);
				}
				
				//session失效监听器
				/*
				$rootScope.on($config.emit.sessionLose, function() {
					_setStatus(statusObj.timeout);
				});
				*/
				
				function _reset() {
					sessionStorage.clear();
					localStorage.clear();
					/*
					_setStatus(statusObj.noRequest);
					localStorage.setItem($config.localKey.sessionId, '');
					localStorage.setItem($config.localKey.token, '');
					localStorage.setItem($config.localKey.isLogin, 0);
					*/
				}
				
				return obj;
			}]
		}
	});

})(window);