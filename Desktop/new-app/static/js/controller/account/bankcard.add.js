/*
 *	我的-设置-我的银行卡-添加银行卡
 */
var moduleName = 'addBankCardControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$promise', '$ui', '$location', '$stateParams', '$pattern', '$account', function($scope, $schttp, $promise, $ui, $location,$stateParams, $pattern, $account) {
		$scope.name = '';
		$scope.card = '';
		
		$scope.mobile = '';
		$scope.sms_type = '1003';
		$scope.sms_code = '';
		//图片验证码
		$scope.verifyCodeSrc = '';
		$scope.verifyCode = '';
		
		//卡号自动检测返回标识，卡号检测成功，用户无需手动输入其他3要素
		//$scope.cardMatch = true;
		//手机校验正则
		$scope.mobilePattern = $pattern.mobile;
		
		$scope.bankList = [];
		$scope.provinceList = [];
		$scope.cityList = [];
		$scope.selectedBankCode = '';
		$scope.selectedProvinceCode = '';
		$scope.selectedCityCode = '';
		
		//隐私协议切换
		$scope.agree = true;
		$scope.switchAgree = function() {
			$scope.agree = !$scope.agree;
		};	

		//银行列表
		$promise.promiseBankList().then(function(data) {
			$scope.bankList = data;
		});
		
		//省列表
		$promise.promiseProvinceList().then(function(data) {
			$scope.provinceList = data;
		});
		
		$scope.provinceChanged = function() {
			if (!$scope.selectedProvinceCode)
				return;
			//市列表
			var postData = {
				province_id: $scope.selectedProvinceCode
			}; 		
			$promise.promiseCityList(postData).then(function(data) {
				$scope.cityList = data;
			});			
		};
		
		//绑卡
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			//绑定银行卡
			var option = {
				path: 'api/card',
				params: { 
					method: 'post',
					data: {
						bank: $scope.selectedBankCode,
						card: $scope.card,
						mobile: $scope.mobile,
						name: $scope.name,
						province: $scope.selectedProvinceCode,
						city: $scope.selectedCityCode,
						smscode: $scope.sms_code					
					}
				},
				success: function(data) {
					$stateParams.fromState = 'recharge';
					$account.resolve($stateParams);
				}
			};
			$schttp.postAsync(option);		
		};
		
		//切换图片验证码
		$scope.changeVerify = function() {
			$promise.promiseVerify('bcard').then(function(data) {
				$scope.verifyCodeSrc = data;
			});
		};		
		
	}]);

})(window);