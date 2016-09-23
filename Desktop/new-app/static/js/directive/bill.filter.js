var moduleName = 'billFilter';
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
            	var sleep = 200;
				element.click(function() {
					$("#J_SiftMask").show();
					$("#J_SiftContent").show();
					$("#J_SiftContent").animate({'bottom':'0'}, sleep);
				});
				
				$(".m_sift .content ul li").click(function() {
					scope.type = $(this).index();//1充值记录2提现记录3投标记录4转让记录
					scope.load();
					$(this).addClass('cur').siblings('li').removeClass('cur');
					$("html").addClass('sift_back');
					_hide();
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