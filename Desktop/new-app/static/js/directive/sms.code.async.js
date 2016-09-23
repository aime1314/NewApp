var moduleName = 'asyncCode';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, ['$promise', '$ui', '$interval', '$pattern', function($promise, $ui, $interval, $pattern) {
        var obj = {
            restrict: 'A',
            replace: true,
            scope: {sms_type: '@smstype', mobile: '@', verifyCodeSrc: '@verifycodesrc', verifyCode: '@verifycode', verify: '&'},
            link: function(scope, element, attrs) {
            	var sendEnable = true;
            	scope.$watch('mobile', function(n, o) {
            		if (n != o) {
			        	element.text('获取验证码');
			            element.unbind().bind('click', function() {
			            	if (!sendEnable)
			            		return;
			            	if (!scope.mobile) {
			            		$ui.toastShow('请输入手机号码');
			            		return;
			            	}
			            	if (!$pattern.mobile.test(scope.mobile)) {
			            		$ui.toastShow('请输入正确的手机号码');
			            		return;	            	
			            	}
			            	if (!scope.sms_type) 
			            		return;
			            	if (scope.verifyCodeSrc!='' && scope.verifyCode=='') {
			            		$ui.toastShow('请输入图片验证码');
			            		return;		            	
			            	}			            		
							//发送短信
							var postDataObj = {
								type: scope.sms_type,
								mobile: scope.mobile,
								imgcode: scope.verifyCode
							};
							$promise.promiseSms(postDataObj, scope.verify).then(function() {
								timer();
								$ui.toastShow('短信验证码已下发到您手机，请注意查收。');
							}, function() {//调用短信发送接口失败，可尝试重新发送
								sendEnable = true;
								element.text('获取验证码');
								element.addClass('cur');						
							});
						}); 
					}
            	}); 
            	
				function timer() {
	            	sendEnable = false;
	            	element.removeClass('cur');
	            	var totalSecs = 60;
	            	element.text(totalSecs+'秒后重新发送');
					//倒计时开始
					var id = $interval(function() {
						totalSecs --;
						element.text(totalSecs+'秒后重新发送');
						if (totalSecs == 0) {
							$interval.cancel(id);
							element.text('获取验证码');
							element.addClass('cur');
							sendEnable = true;
						}
					}, 1000);				
				}            	
            	      
            }//link
        }
        
    	return obj;
    }]);
})(window);