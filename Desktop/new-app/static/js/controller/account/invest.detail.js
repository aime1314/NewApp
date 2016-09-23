/*
 *	我的-我的投资-回款中、正常结清详情
 */
var moduleName = 'investDetailControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', '$state', '$ui', function($scope, $schttp, $stateParams, $state, $ui) {
		$scope.type = $stateParams.type;//1正常结清标的不可债权转让2回款中标的
		$scope.data = {};
		
		init();
		function init() {
			var option = {
				path: 'api/invest',
				params: {
					method: 'detail',
					data: {
						ndd_id: $stateParams.ndd_id
					}
				},
				success: function(data) {
					$scope.data = data;
				}
			};
			$schttp.postAsync(option);		
		}

		//债转
		$scope.transfer = function() {
			if (!$stateParams.ndd_id || $scope.data.transfer_status==1) {
				$ui.toastShow('参数错误，操作失败');
				return;
			}	
			$state.go('debtTransfer', { ndd_id: $stateParams.ndd_id });
		};
		
		//取消债转
		$scope.cancelTransfer = function() {
			if (!$scope.data.ndd_id || $scope.data.transfer_status==0) {
				$ui.toastShow('参数错误，操作失败');
				return;
			}
			var option = {
				path: 'api/invest',
				params: {
					method: 'detail',
					data: {
						ndd_id: $stateParams.ndd_id
					}
				},
				success: function() {
					$ui.toastShow('债权转让已取消', 3000);
					init();
				}			
			}
			$schttp.postAsync(option);
		};
		
	}]);

})(window);