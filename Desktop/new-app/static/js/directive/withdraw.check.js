//检测提现金额是否介于2-可用余额之间
var moduleName = 'withdrawCheck';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, ['$promise', '$config', function($promise, $config) {
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
            			ctrl.$setValidity('minValue', true);
            			ctrl.$setValidity('maxValue', true);
            		});
            	});
            	element.bind('blur', function(event) {
            		scope.$apply(function() {
            			scope.submitForm.submitted = false;
            			ctrl.$focused = false;
            			if (ctrl.$modelValue) {
            				if (parseFloat(ctrl.$modelValue) <= $config.withdraw_fee) {
            					ctrl.$setValidity('minValue', false);
            				} else {
            					ctrl.$setValidity('minValue', true);
	            				$promise.promiseBase().then(function(data) {
	            					var bal = parseFloat(data[0].ava_balance);
	            					if (parseFloat(ctrl.$modelValue) > parseFloat(bal)) {
	            						ctrl.$setValidity('maxValue', false);
	            					} else {
	            						ctrl.$setValidity('maxValue', true);
	            					}
	            				});            				
            				}
            			}
            		});
            	});   	
            }
        }
    	return obj;
    }]);
})(window);