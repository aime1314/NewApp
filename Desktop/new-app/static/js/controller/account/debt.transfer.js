/*
 *	我的-我的投资-详情-债权转让
 */
var moduleName = 'debtTransferControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', '$ui', '$state', '$location', function($scope, $schttp, $stateParams, $ui, $state, $location) {
		$scope.transfer_amount = '';
		$scope.data = {};
		var option = {
			path: 'api/user',
			params: {
				method: 'sell',
				data: {
					ndd_id: $stateParams.ndd_id
				}
			},
			success: function(data) {
				$scope.data = data;
			}
		};
		$schttp.postAsync(option);	
		
		//提交债转
		$scope.submitTransfer = function() {
			if (!$scope.transfer_amount || !$stateParams.ndd_id) {
				$ui.toastShow('参数错误，操作失败');
				return;
			}
			//确认框
			$ui.alertShow('提示', 1, '确认', function() {
				option = {
					path: 'api/debt',
					params: {
						method: 'apply',
						data: {
							ndd_id: $stateParams.ndd_id,
							transfer_amount: $scope.transfer_amount
						}
					},
					success: function() {
						// $state.go('investDetail', {type:2, ndd_id:$stateParams.ndd_id});
						$state.go('invest.backsection', {});
						$location.replace();
					}
				}
				$schttp.postAsync(option);			
			}, '取消', null);
		};		
	
	}]);

})(window);