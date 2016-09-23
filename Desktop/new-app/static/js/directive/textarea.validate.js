var moduleName = 'textareaValidate';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, [function() {
        var obj = {
            restrict: 'A',
            replace: true,
            scope: {max: '=', left: '='},
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
				ctrl.$parsers.push(function(inputValue) {
					var transformedInput = '';
					if (inputValue.length > scope.max) {
						transformedInput = inputValue.substring(0, scope.max);
					} else {
						transformedInput = inputValue;
						scope.left = scope.max - inputValue.length;
					}
					if (transformedInput !== inputValue) {
						ctrl.$setViewValue(transformedInput);
						ctrl.$render();	
					}
					return transformedInput;
				});
            }
        }
    	return obj;
    }]);
})(window);