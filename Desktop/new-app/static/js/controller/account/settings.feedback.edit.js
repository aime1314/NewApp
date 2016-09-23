/*
 *	我的-设置-意见反馈-写意见
 */
var moduleName = 'feedbackEditControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$location', '$state', '$pattern', '$promise', function($scope, $schttp, $location, $state, $pattern, $promise) {
   	    $scope.max = 200;
        $scope.left = 200;
        $scope.content = '';

        //图片验证码
        $scope.verifyCodeSrc = '';
        $scope.verifyCode = '';

        $scope.submit = function() {
            _vercode();
			if ($scope.submitForm.$invalid) {
				return;
			}
            var option = {
            	path: 'api/feedback',
            	params: {
            		method: 'post',
            		data: {
                        imgcode: $scope.verifyCode,
            			content: $scope.content
            		}
            	},
            	success: function() {
            		$state.go('feedback');
            		$location.replace();
            	}
            };
            $schttp.postAsync(option);
        }

        //初始化图片验证码
        function _vercode(){
            $promise.promiseVerify('feed').then(function(data) {
             $scope.verifyCodeSrc = data;
            });
        }
        _vercode();
        //切换图片验证码
        $scope.changeVerify = function() {
             _vercode();
        };  
	}]);

})(window);