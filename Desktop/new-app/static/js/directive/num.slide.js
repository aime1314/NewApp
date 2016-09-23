var moduleName = 'numSlide';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, [function() {
        var obj = {
            restrict: 'AE',
            replace: true,
            require: 'ngModel',
            scope: { fair: '=', real: '=' },
            link: function(scope, element, attrs, ctrl) {
            	scope.$watch('real', function(newVal, oldVal) {
            		if (newVal != oldVal) {
            			var fair = parseFloat(scope.fair);
            			var real = parseFloat(scope.real);
						$('.single-slider').range2DSlider({
							grid: false,
							height: 0,
							className: 'xdsoft_custom',
							showLegend: [1, 0],
							axis: [[real, fair]],
							tooltip: ['top'],
							alwShowTooltip: [true],
							allowAxisMove: ['x'],
							printLabel: function(value) {
								var rtnVal = value[0].toFixed(2);
								ctrl.$setViewValue(rtnVal);
								return rtnVal;
							}
						}).range2DSlider('value', [[real, 0]]);           		
            		}
            	});
            }
        }
    	return obj;
    }]);
})(window);