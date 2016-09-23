var moduleName = 'slideBox';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.directive(moduleName, [function() {
		var obj = {
			restrict: 'AE',
			replace: true,
			link: function(scope, element, attrs) {
				(function($){
					$('#divs2').slider({ maxWidth: '100%', className: "ks_wt_2 myimg", tick: 3000 });
				})(Zepto);
			}
		};
		return obj;
	}]);

})(window);