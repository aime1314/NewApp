var moduleName = 'share';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, ['$util', '$native', '$config',
        function($util, $native, $config) {
            return {
                restrict: 'C',
                link: function(scope, element, attrs) {
                	if (!$util.isApp()) return;
                	element.unbind().bind('click', function(event) {
							var u_id = '',
							name = '',
							url = 'index.html#/share/' + u_id + '/' + name;//分享跳转url
                        var option = {
                            cmd: $config.cmd.share,
                            key: $config.cmd.share,
                            value: {
                                thumb_url: 'https://m.shengcaijinrong.com/static/img/logo_bot.png', 
                                url: url,
                                title:"【生菜金融】推荐生财现金大放送",
                                content:"国资背景靠谱产品，好东西才第一时间告诉你哦！我已抢到手，你也抓紧时间一起投资共享推荐收益~~",
                                download_url: $util.getAppDownloadUrl()                            
                            }
                        };
						$native.callNative(option);
                	});
                }
            }
        }
    ]);

})(window);