var moduleName = 'promise';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.provider('$promise', function() {
		return {
			$get: ['$schttp', '$q', '$account', '$config', '$session', '$window', function($schttp, $q, $account, $config, $session, $window) {
				var URL = $window.URL || $window.webkitURL;//解析二进制图片
				var obj = {
					promiseLogin: _promiseLogin,
					promiseLogout: _promiseLogout,
					promiseSms: _promiseSms,
					promiseVerify: _promiseVerify,
					promiseBase: _promiseBase,
					promiseAuth: _promiseAuth,//_promiseAuth,_promiseCardNum
					promiseNoAuth: _promiseNoAuth,
					promiseCardBind: _promiseCardBind,
					promiseNoCardBind: _promiseNoCardBind,
					promiseCardTypeList: _promiseCardTypeList,
					promiseBankList: _promiseBankList,
					promiseProvinceList: _promiseProvinceList,
					promiseCityList: _promiseCityList,
					promiseLogoutFn: _promiseLogoutFn,//promise登出的接口
					logout: _logout
				};
				
				//promise是否已登录
				function _promiseLogin() {
					var defer = $q.defer();
					if ($account.isLogin()) 
						defer.resolve();
					else
						defer.reject();
					return defer.promise;				
				}
				
				//promise是否已登出
				function _promiseLogout() {
					var defer = $q.defer();
					if ($account.isLogin()) 
						defer.reject();
					else
						defer.resolve();
					return defer.promise;				
				}
				
				//promise短信发送接口
				function _promiseSms(postDataObj, loadVerify) {
					var defer = $q.defer();
					var option = {
						path: 'api/sms',
						params: { method: 'post' },
						success: function() {
							defer.resolve();
						},
						error: function() {
							defer.reject();
						},
						verifyCode: function() {
							if (angular.isFunction(loadVerify)) {
								loadVerify.call(this, {});						
							}
						}
					};
					if (angular.isObject(postDataObj))
						option.params['data'] = postDataObj;	
					$schttp.postAsync(option);			
					return defer.promise;						
				}
				
				//promise图片验证码发送接口
				function _promiseVerify(method) {
					var defer = $q.defer();
					var option = {
						path: 'api/code',
						params: { method: method },
						config: {
							responseType: 'blob'
						},
						success: function(data) {
							defer.resolve(URL.createObjectURL(data));
						},
						error: function() {
							defer.reject();
						}
					};
					$schttp.postVerify(option);			
					return defer.promise;						
				}
				
				//个人基本信息查询
				function _promiseBase(postDataObj) {
					var defer = $q.defer();
					_promiseLogin().then(function() {
						var option = {
							path: 'api/user',
							params: { method: 'get' },
							success: function(data) {
								localStorage.setItem($config.localKey.isAuth, data[0].check_state);//是否实名认证：0-未申请1-申请中2-实名成功3-清算开户失败4-账务开户失败实名失败5-处理回调信息异常
								localStorage.setItem($config.localKey.cardNum, data[0].withdraw_enable_card_num);//是否绑卡	
								defer.resolve(data);
							},
							error: function() {
								defer.reject();
							}
						};
						if (angular.isObject(postDataObj))
							option.params['data'] = postDataObj;				
						$schttp.postAsync(option);				
					}, function() {
						defer.reject();
					});
					return defer.promise;			
				}	
				
				//promise是否实名认证
				function _promiseAuth() {
					var defer = $q.defer();
					if (localStorage.getItem($config.localKey.isAuth) == '2')
						defer.resolve();
					else {
						_promiseBase().then(function(data) {
							var is_auth = data[0].check_state;
							if (is_auth == '2')
								defer.resolve();
							else
								defer.reject();
						}, function() {
							defer.reject();
						});
					}
					return defer.promise;
				}
				
				//promise是否未实名认证
				function _promiseNoAuth() {
					var defer = $q.defer();
					if (localStorage.getItem($config.localKey.isAuth) == '2')
						defer.reject();
					else {
						_promiseBase().then(function(data) {
							var is_auth = data[0].check_state;
							if (is_auth == '2')
								defer.reject();
							else
								defer.resolve();
						}, function() {
							defer.reject();
						});
					}
					return defer.promise;
				}
				
				//promise是否已绑卡
				function _promiseCardBind() {
					var defer = $q.defer();
					var card_num = localStorage.getItem($config.localKey.cardNum) || 0;
					if (card_num != '0')
						defer.resolve(card_num);
					else {
						_promiseBase().then(function(data) {
							card_num = data[0].withdraw_enable_card_num;
							if (card_num != '0')
								defer.resolve(card_num);
							else
								defer.reject();
						}, function() {
							defer.reject();
						});
					}
					return defer.promise;		
				}			
				
				//promise是否未绑卡
				function _promiseNoCardBind() {
					var defer = $q.defer();
					var card_num = localStorage.getItem($config.localKey.cardNum) || 0;
					if (card_num != '0')
						defer.reject();
					else {
						_promiseBase().then(function(data) {
							card_num = data[0].withdraw_enable_card_num;
							if (card_num != '0')
								defer.reject();
							else
								defer.resolve();
						}, function() {
							defer.reject();
						});
					}
					return defer.promise;		
				}	
			
				//promise证件类型列表接口
				function _promiseCardTypeList(postDataObj) {
					var defer = $q.defer();
					var option = {
						path: 'api/card',
						params: { method: 'type' },
						success: function(data) {
							defer.resolve(data);
						},
						error: function() {
							defer.reject();
						}
					};
					if (angular.isObject(postDataObj))
						option.params['data'] = postDataObj;			
					$schttp.postAsync(option);
					return defer.promise;			
				}
			
				//promise银行列表接口
				function _promiseBankList(postDataObj) {
					var defer = $q.defer();
					var option = {
						path: 'api/bank',
						params: { method: 'get' },
						success: function(data) {
							defer.resolve(data);
						},
						error: function() {
							defer.reject();
						}
					};
					if (angular.isObject(postDataObj))
						option.params['data'] = postDataObj;			
					$schttp.postAsync(option);
					return defer.promise;			
				}
				
				//promise省列表接口
				function _promiseProvinceList(postDataObj) {
					var defer = $q.defer();
					var option = {
						path: 'api/region',
						params: { method: 'province' },
						success: function(data) {
							defer.resolve(data);
						},
						error: function() {
							defer.reject();
						}
					};
					if (angular.isObject(postDataObj))
						option.params['data'] = postDataObj;				
					$schttp.postAsync(option);
					return defer.promise;			
				}
					
				//promise市列表接口
				function _promiseCityList(postDataObj) {
					var defer = $q.defer();
					var option = {
						path: 'api/region',
						params: { method: 'city' },
						success: function(data) {
							defer.resolve(data);
						},
						error: function() {
							defer.reject();
						}
					};
					if (angular.isObject(postDataObj))
						option.params['data'] = postDataObj;			
					$schttp.postAsync(option);	
					return defer.promise;		
				}	
				
				//promise登出接口
				function _promiseLogoutFn(postDataObj) {
					var defer = $q.defer();
					_promiseLogin().then(function() {
						var option = {
							path: 'api/user',
							params: {
								method: 'logout'
							},
							success: function() {
								defer.resolve();
							},
							error: function() {
								defer.reject();
							}
						};
						if (angular.isObject(postDataObj))
							option.params['data'] = postDataObj;
						$schttp.postAsync(option);				
					}, function() {
						defer.reject();
					});
					return defer.promise;	
				};
				
				function _logout() {
					_promiseLogoutFn().then(function() {
						$session.reset();
						$session.promiseSession(true).then(function() {
							$account.logout(false);
						}, function() {
							$account.logout(false);//init失败也重新登录
						});					
					}, function() {
						//尝试登出失败，强制用户登录，同1012处理
						$session.reset();
						$session.promiseSession(true).then(function() {
							$account.logout(false);
						}, function() {
							$account.logout(false);//init失败也重新登录
						});				
					});					
				}
				
				return obj;
			}]
		}
	});

})(window);