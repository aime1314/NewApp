var moduleName = 'ngFocus';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, [function() {
        var obj = {
            restrict: 'A',
            replace: true,
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
            	ctrl.$focused = true;
            	element.bind('focus', function(event) {
            		scope.$apply(function() {
            			scope.submitForm.submitted = false;
            			ctrl.$focused = true;
            		});
            	});
            	element.bind('blur', function(event) {
            		scope.$apply(function() {
            			scope.submitForm.submitted = false;
            			ctrl.$focused = false;
            		});
            	});
            }
        }
    	return obj;
    }]);
})(window);