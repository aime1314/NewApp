var moduleName = 'back';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, ['$window', '$location',
        function($window, $location) {
            return {
                restrict: 'C',
                link: function(scope, element, attrs) {
                	//element add new attribute back_url, e.g: 
                	//<a class='header-l back' back-url='home'>
                	var backUrl = attrs.backUrl;
                	element.on('click', function(event) {
                		if (!backUrl) {
                			var backNum = sessionStorage.getItem('backNum') || '-1';
                			sessionStorage.setItem('backNum', '-1');
                			$window.history.go(backNum);
                			event.preventDefault();
                		} else {
                			document.location = 'index.html#/'+backUrl;
                			//$location.path(backUrl);
                			//scope.$apply();
                		}
                	});
                }
            }
        }
    ]);

})(window);