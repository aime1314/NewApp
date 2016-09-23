/*
 *	我的-设置-实名认证
 */
var moduleName = 'authControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$account', '$schttp', '$promise', '$util', '$pattern', '$stateParams', function($scope, $account, $schttp, $promise, $util, $pattern, $stateParams) {
		$scope.backEnable = true;
		if (!$util.getParams('routerParams'))
			$util.setParams('routerParams', $stateParams, true);
		var stateParams = angular.copy($util.getParams('routerParams'));
		if (stateParams.fromState == 'register')
			$scope.backEnable = false;
		//实名认证状态：0-未申请1-申请中2-实名成功3-清算开户失败4-账务开户失败实名失败5-处理回调信息异常
		$scope.auth_status = '0';
		$promise.promiseBase().then(function(data) {
			$scope.auth_status = data[0].check_state;
			if ($scope.auth_status == '2') {
				$account.resolve(stateParams);
			}
		});
		$scope.mobile = $util.getParams('mobile') || '';
		$scope.idCardPattern = $pattern.idCard;
		$scope.name = '';
		$scope.password = '';
		$scope.password2 = '';
		$scope.payPasswordPattern = $pattern.payPassword;
		$scope.card = '';
		$scope.paperTypes = [];
		$scope.paper_code = '01';//证件类型
		
		$promise.promiseCardTypeList().then(function(data) {
			$scope.paperTypes = data;
		});
		
		//实名认证
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			var option = {
				path: 'api/user',
				params: {
					method: 'account',
					data: {
						auth_type: 1,//1个人2企业
						mobile: $scope.mobile,
						name: $scope.name,
						paper_type: $scope.paper_code,
						paper_code: $scope.card,
						password: $scope.password
					}
				},
				success: function(data) {
					//if (!$scope.backEnable) {//注册-实名认证-绑卡
						stateParams.fromState = 'addBankCard';
					//}
					$account.resolve(stateParams);
					$util.unsetParams('routerParams');
				}
			};
			$schttp.postAsync(option);			
		};
		
	}]);

})(window);