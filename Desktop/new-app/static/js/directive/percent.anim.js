var moduleName = 'percentAnim';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, [function() {
        var obj = {
            restrict: 'A',
            link: function(scope, element, attrs) {
            	scope.$watch(attrs.percentAnim, function(newVal, oldVal) {
            		$(element).find('.percent-on').animate({'width':newVal+'%'}, 500);
            		if (newVal != oldVal) {
						$(element).find('.percent-on').animate({'width':newVal+'%'}, 500);
            		}
            	});
            }
        }
    	return obj;
    }]);
})(window);