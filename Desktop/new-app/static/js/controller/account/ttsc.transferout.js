/*
 *	我的-天天生财-转出
 */
var moduleName = 'ttscTransferoutControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$util', '$schttp', '$state', '$location', '$stateParams', function($scope, $util, $schttp, $state, $location, $stateParams) {
		$scope.mobile = $util.getParams('mobile');
		$scope.uis_total_str = $stateParams.uis_total;
		$scope.uis_total = parseFloat($scope.uis_total_str);
		$scope.amount = '';
		
		//全转
		$scope.allIn = function() {
			$scope.amount = $scope.uis_total;
		};
		
		//转出
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			if (parseFloat($scope.amount) > 0) {
				var option = {
					path: 'api/ttsc',
					params: {
						method: 'withdraw',
						data: {
							amount: $scope.amount,
							p_id: $stateParams.p_id
						}
					},
					success: function() {
						$state.go('account');
						$location.replace();
					}
				};	
				$schttp.postAsync(option);
			} else {
				$ui.toastShow('转出金额输入有误，请重新输入');
			}		
		};		
	}]);

})(window);