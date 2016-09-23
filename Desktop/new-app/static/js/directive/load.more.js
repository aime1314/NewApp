var moduleName = 'loadMore';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, [function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                	var statusArr = ['点击加载更多','努力加载中','已加载全部'];
                	scope.$watch(attrs.loadMore, function(status) {
                		if (angular.isUndefined(status))
                			status = 0;
                		element.text(statusArr[status]);
                	});
                }
            }
        }
    ]);

})(window);