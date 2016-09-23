var moduleName = 'transferTimer';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, ['$interval', function($interval) {
    	var key = null;
    	return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attrs) {
            	scope.$watch(attrs.transferTimer, function(n, o) {
            		if (angular.isDefined(n) || (n!=o)) {
            			var totalSeconds = parseInt(n);
            			rebuildTimerView(totalSeconds);
            			key = $interval(function() {
            				totalSeconds--;
							if (totalSeconds < 1) {
								$interval.cancel(key);
								return;
							}
							rebuildTimerView(totalSeconds);
            			}, 1000);
            		} 
            	});
            
            	function rebuildTimerView(totalSeconds) {
            		//剩余毫秒数
            		var left_timestamp = totalSeconds * 1000;
            		//剩余天数
            		var days = Math.floor(left_timestamp / (24 * 3600 *1000));
            		if (days && days < 10) 
            			days = '0' + days;
            		//剩余小时
            		var hours_diff = left_timestamp % (24 * 3600 * 1000);
            		var hours = Math.floor(hours_diff / (3600 * 1000));
            		if (hours && hours < 10) 
            			hours = '0' + hours;
            		//剩余分
            		var minutes_diff = hours_diff % (3600 * 1000);
            		var minutes = Math.floor(minutes_diff / (60 * 1000));
            		if (minutes && minutes < 10) 
            			minutes = '0' + minutes;
            		//剩余秒
            		var seconds_diff = minutes_diff % (60 * 1000);
            		var seconds = Math.floor(seconds_diff / 1000);
            		if (seconds && seconds < 10) 
            			seconds = '0' + seconds;
            		element.html('距离结束：<em>'+days+'</em>天<em>'+hours+'</em>小时<em>'+minutes+'</em>分<em>'+seconds+'</em>秒');            	
            	}
            	
				scope.$on('$destroy', function(event) {
					if (key)
						$interval.cancel(key);
				});           	
            }
        }
	}]);

})(window);