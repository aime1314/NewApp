var moduleName = 'mainControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$rootScope', '$state', '$native', '$config', '$ui', '$util', '$promise', function($rootScope, $state, $native, $config, $ui, $util, $promise) {
		$rootScope.$state = $state;
		
		if ($util.isApp()) {
	        var option = {
	            cmd: $config.cmd.empty,
	            key: $config.cmd.empty,
	            value: {},
	            callback: function(data) {
	            	var result = angular.fromJson(data);
	            	switch (result.type) {
	            		case $config.empty.type.toast:
	            			$ui.toastShow(result.content);
	            			break;
	            		case $config.empty.type.removeGesture://原生主动发起清除手势密码
	            			$promise.logout();
	            			break;
	            	}
	            }
	        };		
			$native.callNative(option, true);	
            
            //写bar_bg
            /*var barBg = '#099ddd';//android:#后必须6位或8位，不然客户端会crash
            if ($util.isIosApp()) {
                barBg = '9,100,11,205';//9,157,211,255
            }
            option = {
                cmd: $config.cmd.write,
                key: 'bar_bg',
                value: barBg,
                callback: function() {
                
                }
            };  
            $native.callNative(option); */   	
		}
	}]);

})(window);