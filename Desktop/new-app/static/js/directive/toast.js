var moduleName = 'toast';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.directive(moduleName, ['$config', '$timeout', function($config, $timeout) {
		var obj = {
			restrict: 'E',
			replace: true,
			template: '<div class="toast_p"><p></p><div class="toast_div"></div></div>',
			link: function(scope, element, attrs) {
				scope.$on($config.emit.toastShow, function(event, msg, time, callback) {
					if (!msg) return;
					time = time || 2000;
					element.find('p').text(msg);
					element.addClass('toast_show');
					var key = $timeout(function(event) {
						element.removeClass('toast_show');
						if (angular.isFunction(callback)) {
							$timeout(function() {
								callback();
							}, 1000);
						}
					}, time);
					key.then(function(){
					
					}, function() {
					
					});
					scope.$on('$destroy', function(event) {
						$timeout.cancel(key);
					});
				});
			}
		};
		return obj;
	}]);
	
})(window);