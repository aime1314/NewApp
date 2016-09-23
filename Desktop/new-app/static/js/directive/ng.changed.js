var moduleName = 'ngChanged';
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
            	ctrl.$changed = false;
            	element.bind('change', function(event) {
            		scope.$apply(function() {
            			scope.submitForm.submitted = false;
            			ctrl.$changed = true;
            		});
            	});
            }
        }
    	return obj;
    }]);
})(window);