/*
 *	我的-设置-密码管理－重置支付密码
 */
var moduleName = 'resetPayPasswordControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$util', '$stateParams', '$pattern', '$state', '$location', function($scope, $schttp, $util, $stateParams, $pattern, $state, $location) {
		$scope.mobile = '';
		$scope.sms_code = '';
		$scope.password = '';
		$scope.password2 = '';
		$scope.sms_type = '1001';
				
		$scope.payPasswordPattern = $pattern.payPassword;
		
		try {
			$scope.mobile = $util.getParams('mobile');
		} catch (e) {
			$scope.mobile = '';
		}
		
		//修改支付密码
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			var option = {
				path: 'api/user',
				params: {
					method: 'reset',
					data: {
						captcha: $scope.sms_code,
						new_password: $scope.password
					}
				},
				success: function(data) {
					var fromState = $stateParams.fromState;
					delete $stateParams.fromState;
					$state.go(fromState, $stateParams);
					$location.replace();
				}
			};
			$schttp.postAsync(option);
		}
		
	}]);
})(window);