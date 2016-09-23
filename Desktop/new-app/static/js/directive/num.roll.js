var moduleName = 'numRoll';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, ['$interval', function($interval) {
        var obj = {
            restrict: 'A',
            link: function(scope, element, attrs) {
            	scope.$watch(attrs.numRoll, function(newVal, oldVal) {
            		element.text('更新中...');
            		if (newVal != oldVal) {
            			if (!angular.isNumber(parseFloat(newVal)))
            				return;
						numRollNow(element, newVal);
            		}
            	});
            }
        }
        
        function numRollNow(element, newVal) {
            var t = 10;
            var newValStr = newVal.toString().replace(/,/g, '');
            var val = parseFloat(newValStr) / t;
            var dotAfter = 0;
            if (newValStr.indexOf('.') > -1)
            	dotAfter = newValStr.length - newValStr.indexOf('.') -1;
            var id = $interval(function() {
				if (t--) {
                	var v = parseFloat(val*(10-t)).toFixed(dotAfter);
            		var var2 = v.split('.');
                 	var varr = var2[0].split('');
                	for (var i = varr.length-4; i >= 0; i -= 3) 
                		varr[i] += ',';
                	if (var2[1])
                  		element.text(varr.join('') + '.' + var2[1]);
            		else
                  		element.text(varr.join(''));
              	}
              	else {
              		$interval.cancel(id);
              	}
            }, 100);        
        }
    	return obj;
    }]);
})(window);