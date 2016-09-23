var moduleName = 'util';
module.exports = moduleName;

(function(win) {
	
	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.factory('$util', ['$config', '$q', '$account', '$state', function($config, $q, $account, $state) {
		var obj = {
			//判断载体是否是app
			isApp: function() {
				return navigator.userAgent.indexOf('shengcaijinrong_') > -1;
			},
			isAndroidApp: function() {
				return navigator.userAgent.indexOf('shengcaijinrong_android') > -1;
			},
			isIosApp: function() {
				return navigator.userAgent.indexOf('shengcaijinrong_ios') > -1;
			},
			isOldIosApp: function() {
				return navigator.userAgent.indexOf('shengcai_hybird_ios') > -1;
			},
			isOldAndroidApp: function() {
				return navigator.userAgent.indexOf('shengcai_hybird') > -1 && this.isAndroidDevice();
			},
			isAndroidDevice: function() {
				return navigator.userAgent.indexOf('Android') > -1/* || navigator.userAgent.indexOf('Linux') > -1*/;
			},
			isIosDevice: function() {
				return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			},
			isOtherDevice: function() {//非app、android设备、ios设备
				return !(this.isApp() || this.isAndroidDevice() || this.isIosDevice());
			},
			getAppDownloadUrl: function() {
				return (this.isAndroidDevice() && $config.device.androidDownloadUrl) 
						|| (this.isIosDevice() && $config.device.iosDownloadUrl)
						|| '#';
			},
			getRequestSource: function() {
				return (this.isApp() && 'app') || ((this.isAndroidDevice() || this.isIosDevice()) && 'h5') || 'pc';
			},
			//根据接口参数拼接接口地址
			getRequestUrl: function(path, params) {
				var base = $config.interfaceUrl + path;
				return base;
			},
			//生成post数据
			seriesRequestData: function(params) {
				params["source"] = this.getRequestSource();
				params['version'] = '2.0.0.0';
				params["data"] = params.data || {};
				params["data"].session_id = localStorage.getItem($config.localKey.sessionId) || '';
				params["data"].token = localStorage.getItem($config.localKey.token) || '';
				var paramsArr = [];
				angular.forEach(params, function(v, k) {
					if (angular.isObject(v)) {
						v = angular.toJson(v);
					} else {
						v = '"' + v + '"';
					}
					this.push('"' + k + '"' + ':' + v);
				}, paramsArr);
				return 'argv={' + paramsArr.join(',') + '}';			
			},
			setParams: function(key, data, reset) {
				try {
					var _data = angular.fromJson(sessionStorage[key] || '{}');
				} catch (e) {
					sessionStorage[key] = angular.toJson({});
				}
				if (angular.isObject(_data) && angular.isObject(data) && reset !== true) {
					angular.extend(_data, data);
					sessionStorage[key] = angular.toJson(_data);
				} else if (angular.isObject(data)) {
					sessionStorage[key] = angular.toJson(data);
				} else {
					sessionStorage[key] = data;
				}
			},
			getParams: function(key) {
				return (sessionStorage[key] && angular.fromJson(sessionStorage[key])) || '';
			},
			unsetParams: function(key) {
				sessionStorage.removeItem(key);
			}
		};
		
		//将session_id加到data对象
		function _getSessionData(data) {
			var sessionId = localStorage.getItem($config.localKey.sessionId);
			data.q = data.q || {},
			data.q.session_id = sessionId || '';
			data.q = angular.toJson(data.q);
			return data;
		}
		
		return obj;
	}]);
	
})(window);