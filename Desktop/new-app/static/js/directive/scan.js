var moduleName = 'scan';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, ['$util', '$native', '$config', '$ui',
        function($util, $native, $config, $ui) {
            return {
                restrict: 'C',
                link: function(scope, element, attrs) {
                	if (!$util.isApp()) return;
                	element.unbind().bind('click', function(event) {
                        var option = {
                            cmd: $config.cmd.scan,
                            key: $config.cmd.scan,
                            value: {},
                            callback: function(data) {
                                $ui.toastShow('call back data:'+data);
                            }
                        };
						$native.callNative(option);
                	});
                }
            }
        }
    ]);

})(window);