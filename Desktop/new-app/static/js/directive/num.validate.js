/*
 * 
 * 正则对输入的数字做校验
 * 目前只支持整数和4位以下浮点数，超过4位浮点数按浮点数后2位处理
 *
 */
var moduleName = 'numValidate';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.directive(moduleName, ['$util', '$config', function($util, $config) {
		return {
			restrict: 'AEC',
			replace: true,
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelControl) {
				var dotAfter = attrs.numValidate;
				if (!dotAfter) 
					dotAfter = 0;
				ngModelControl.$parsers.push(function(inputValue) {
					var transformedInput = '';
					switch (parseInt(dotAfter)) {
						case 0:
							transformedInput = inputValue.replace(/[^\d]/g, '');		
							break;
						default:
							if (inputValue.length == 1)
								transformedInput = inputValue.replace(/[^\d]/g, '');
							else {
						        var regex = /^\.|[^\d\.]/g;
						        var regex1 = /(\.)\1/g;
						        var regex2 = /(\d\.{1}\d{2,})[(\.?)|(\.?\d)]/g;
						        switch (parseInt(dotAfter)) {
						        	case 1: 
						        		regex2 = /(\d\.{1}\d{1,})[(\.?)|(\.?\d)]/g;
						        		break;
						        	case 3:
						        		regex2 = /(\d\.{1}\d{3,})[(\.?)|(\.?\d)]/g;
						        		break;
						        	case 4:
						        		regex2 = /(\d\.{1}\d{4,})[(\.?)|(\.?\d)]/g;
						        		break;
						        }
						        transformedInput = inputValue.replace(regex, '');
						        transformedInput = transformedInput.replace(regex1, '.');
						        transformedInput = transformedInput.replace(regex2, '$1');  
						    }
							break;
					}					
					if (transformedInput !== inputValue) {
						ngModelControl.$setViewValue(transformedInput);
						ngModelControl.$render();
					}
					return transformedInput;
				});					
			}
		};
	}]);
	
})(window);