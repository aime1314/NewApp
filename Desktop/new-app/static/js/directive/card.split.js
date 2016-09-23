var moduleName = 'cardSplit';
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
				ctrl.$parsers.push(function(inputValue) {
					console.log('inputValue:'+inputValue);
					if (inputValue.length % 4 == 0) {
						console.log(ctrl.$modelValue);
						console.log(ctrl.$viewValue);
						//ctrl.$modelValue = inputValue;
						inputValue += ' ';
						ctrl.$setViewValue(inputValue);
						ctrl.$render();	
						console.log(ctrl.$viewValue);
					}
					return inputValue;
				});
            }
        }
    	return obj;
    }]);
})(window);