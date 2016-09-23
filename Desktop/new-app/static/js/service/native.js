var moduleName = 'schttp';
module.exports = moduleName;

(function(win) {
	
	'use strict';
	
	var callbackHandlers = [],
		token = 0;
	
	var mainApp = angular.module('mainApp');
	
	mainApp.service('$native', ['$rootScope', '$q', '$util', '$ui', '$config', function($rootScope, $q, $util, $ui, $config) {
		//angularjs调用原生接口请求入口
		this.callNative = function(option, keepAlive) {
			if (!$util.isApp()) return;
			keepAlive = keepAlive === true;
			var nativeRequest = new NativeRequest(option, keepAlive);
			nativeRequest.createIframe();
		};
		
		this.deferNative = function(option) {
			var handler = option.callback,
				deferred = $q.defer();
			option.callback = function(result) {
				deferred.resolve(result);
			};
			deferred.promise.then(function(result) {
				if (angular.isFunction(handler) && result) {
					result = angular.fromJson(result);
					if (!$rootScope.$$phase) 
						$rootScope.$apply(callbackFn);
					else
						$rootScope.evalAsync(callbackFn);
				}
				function callbackFn() {
					handler.call(null, result);
				}
			});
			this.callNative(option);
			return deferred;
		};
		
		function NativeRequest(option, keepAlive) {
			this.option = option;
			this.token = getToken();
			this.keepAlive = keepAlive;
		}
		
		function getToken() {
			return ++token;
		}
		
		//新建Iframe，发送原生请求
		NativeRequest.prototype.createIframe = function() {
			var id = 'objecIframe_' + this.token,
				iframe = win.document.createElement('iframe'),
				_this = this;
			this.iframe = iframe;
			iframe.onload = function() {
				iframeLoaded.apply(_this);		
			};	
			iframe.id = id;
			iframe.border = 0;
			iframe.width = 0;
			iframe.height = 0;
			iframe.style.display = 'none';
			//添加iframe至body
			win.document.body.appendChild(iframe);
			
			function iframeLoaded() {
				var childWin = iframe.contentWindow;
				//子窗口回调
				childWin.applicationCallbackJsFunction = _objcFunctionCallback;
				callbackHandlers[this.token] = this;
				//子窗口发送请求
				_callObjcFunction.call(iframe, this.option.cmd, this.option.key, this.option.value, this.token);
			}		
		};
		
		win.applicationCallbackJsFunction = _objcFunctionCallback;
		
		//请求原生App
		function _callObjcFunction(cmd, key, val, token) {
			key = key || '';
			val = val || '';
			if (angular.isObject(key)) 
				key = angular.toJson(key);
			if (angular.isObject(val)) 
				val = angular.toJson(val);
			key = encodeURIComponent(key);
			val = encodeURIComponent(val);
			this.src = 'objc://__jsCallApplicationFunction/&' + [cmd, key, val, token].join('&');
			/*console.log(this.src);
			var o = {
				type: 2,
				content: {type:1}
			}
			_objcFunctionCallback(7, 1, angular.toJson(o));*/
		}
		
		//原生App回调处理
		function _objcFunctionCallback(cmd, token, result) {
			result = decodeURIComponent(result);
			var nativeRequest = callbackHandlers[token],
				callback = nativeRequest.option.callback;
			if (angular.isFunction(callback)) {
				try {
					callback(result);
				} catch (err) {
					console.log(err);
					throw err;
				} finally {
					if (!nativeRequest.keepAlive) {
						win.document.body.removeChild(nativeRequest.iframe);
						callbackHandlers[token] = null;
					}
				} 
			}				
		}		
	}]);
	
})(window);