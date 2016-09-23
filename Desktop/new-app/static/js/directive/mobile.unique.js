//检测手机号码是否已注册
var moduleName = 'mobileUnique';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, ['$pattern', '$schttp', function($pattern, $schttp) {
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
						if ($pattern.mobile.test(ctrl.$modelValue)) {
							var option = {
								path: 'api/user',
								params: {
									method: 'check',
									data: {
										mobile: ctrl.$modelValue
									}
								},
								success: function(data) {
									if (data.is_register == '0')
										ctrl.$setValidity("unique", true);
									else
										ctrl.$setValidity("unique", false);
								},
								error: function() {
									ctrl.$setValidity("unique", true);
								}
							}; 
							$schttp.postAsync(option);           			
            			}
            		});
            	});   	
            }
        }
    	return obj;
    }]);
})(window);