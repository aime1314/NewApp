var moduleName = 'amountValidate';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, [function() {
        var obj = {
            restrict: 'A',
            replace: true,
            require: 'ngModel',
            scope: {balance: '@', leftamount: '@', minamount: '@', bidtype: '@'},//type:1天天生财0普通标
            link: function(scope, element, attrs, ctrl) {
            	scope.$watch('leftamount', function(n, o) {
            		if (n || (n!=o)) {
	            		if (parseFloat(scope.balance) >= parseFloat(scope.minamount)) {//账户余额大于最低投标金额
			            	element.bind('blur', function(event) {
			            		scope.$apply(function() {
			            			if (parseFloat(ctrl.$modelValue) < parseFloat(scope.minamount)) {//输入金额小于最低投标金额：自动变成最低投标金额
			            				ctrl.$setViewValue(amount2Str(scope.bidtype, scope.minamount));
			            			} else {//输入金额大于最低投标金额
			            				if (parseFloat(ctrl.$modelValue) > parseFloat(n)) {//输入金额大于剩余可投金额
			            					if (parseFloat(scope.balance) >= parseFloat(n)) {//账户余额大于剩余可投金额：自动变动剩余可投金额
			            						ctrl.$setViewValue(amount2Str(scope.bidtype, n));
			            					} else {//账户余额小于剩余可投金额：用账户余额全投
			            						ctrl.$setViewValue(amount2Str(scope.bidtype, scope.balance));
			            					}
			            				} else {//输入金额小于剩余可投金额
			            					if (parseFloat(scope.balance) <= parseFloat(ctrl.$modelValue)) {
			            						ctrl.$setViewValue(amount2Str(scope.bidtype, scope.balance));
			            					}
			            				}
			            			}
			            			ctrl.$render();
			            		});
			            	});            			
	            		}
            		}
            	});
            }
        };
        
        function amount2Str(type, amount) {
        	//if (type == '1')
        		return parseFloat(amount).toFixed(2).toString();
        	//else 
        		//return Math.floor(amount).toString();
        }
    	return obj;
    }]);
})(window);