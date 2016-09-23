var moduleName = 'ttscFilter';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, [function() {
        var obj = {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attrs) {
            	element = $(element);
				scope.$watchCollection(attrs.ttscFilter, function(n, o) {
					if (n != o) {
						scope.$applyAsync(function() {
							$(".m_sift .content ul li").click(function() {
								scope.index = $(this).index();
								scope.switchData();
								$(this).addClass('cur').siblings('li').removeClass('cur');
								$("html").addClass('sift_back');
								_hide();
							});	
						});			
					}
				});            
            	var sleep = 200;
				element.click(function() {
					$("#J_SiftMask").show();
					$("#J_SiftContent").show();
					$("#J_SiftContent").animate({'bottom':'0'}, sleep);
				});

				$("#J_SiftMask").click(function(event) {
					_hide();
				});
				
				function _hide() {
					$("#J_SiftContent").animate({'bottom':'-6.3rem'}, sleep, function(){
						$("#J_SiftContent").hide();
					});
					$("#J_SiftMask").stop().fadeOut(sleep);				
				}
            }
        };
        
    	return obj;
    }]);
})(window);