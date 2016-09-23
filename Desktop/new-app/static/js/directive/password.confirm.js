var moduleName = 'passwordConfirm';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, [function() {
		return {
			restrict: 'EA',
			require: 'ngModel',
 			link: function(scope, element, attrs, ctrl) {
            	var otherInput = element.inheritedData("$formController")[attrs.passwordConfirm];//上面输入的新密码
  
            	ctrl.$parsers.push(function(value) {  
            		if (otherInput.$viewValue && !otherInput.$error.pattern)
                		ctrl.$setValidity("repeat", value === otherInput.$viewValue);
                	return value;  
            	});  
  
            	otherInput.$parsers.push(function(value) {  
            		if (ctrl.$viewValue && !ctrl.$error.pattern)
                		ctrl.$setValidity("repeat", value === ctrl.$viewValue);  
                	return value;  
            	});              	
            }			
       	}
    }]);

})(window);
                
                
               