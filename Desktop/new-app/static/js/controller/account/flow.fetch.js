/*
 *	我的-我的流量-提取到手机
 */
var moduleName = 'flowFetchControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$location','$promise', '$ui', '$stateParams', '$account', '$util', '$state', '$pattern', function($scope, $schttp,$location, $promise, $ui, $stateParams, $account, $util, $state, $pattern) {
		var total_flow = $scope.total_flow = $util.getParams('total_flow') || 0;
		$scope.mobile = $util.getParams('mobile');
		$scope.flow = '0';
		$scope.balance = '获取中';
		$promise.promiseBase().then(function(data) {
			$scope.balance = data[0].ava_balance;
		});
		
		//提取
		$scope.submitted = false;
		$scope.submit = function() {
			if ($scope.submitForm.$invalid) {
				$scope.submitForm.submitted = true;
				return;
			}
			if ($scope.flow > total_flow) {
				$ui.toastShow('您最多可以提取'+total_flow+'MB流量', 2000);
				return;					
			}
			if ($scope.flow == '0') {
				$ui.toastShow('请选择您要提取的流量', 2000);
				return;					
			}

			$promise.promiseLogin().then(function() {
				$promise.promiseAuth().then(function() {
					$promise.promiseCardBind().then(function() {
						if (parseFloat(total_flow) >= parseFloat($scope.flow)) {
							//提取
							goFlow();								
						} else {
							//提取超额
							$ui.toastShow('您最多可以提取'+total_flow+'MB流量', 2000);
						}							
					}, function() {
						//未绑卡
						$state.go('addBankCard', {fromState:'common'});					
					});					
				}, function() {
					//未认证
					$state.go('auth', {fromState:'common'});	
				});
			}, function() {
				//未登录
				$state.go('login', {fromState:'common',nb_id:nb_id});	
			});				

		};	


		//调用密码弹框
		function goFlow() {
			$ui.confirmPasswordShow('请输入支付密码', '确定', function(password) {
				if (!password) {
					$ui.toastShow('支付密码不能为空，请重新输入', 3000);
				} else if (!$pattern.payPassword.test(password)) {
					$ui.toastShow('支付密码输入错误，请重新输入', 2000);
				} else {
					$schttp.postAsync({
						path: 'api/flow',
						params: {
							method: 'withdraw',
							data: {
								password: password,
								flow: $scope.flow		
							}
						},
						success: function(data) {
							$ui.hide();
							$location.path('flow').replace();
						},
						businessError: function() {
							$ui.unlock();
						}
					});
					//$schttp.postAsync(option);
				}
			}, '取消', null, function() {
				$state.go('resetPayPassword', {fromState:'common'});	
			});		
		}	
		
		//流量查询
		 _initFlow();
		function _initFlow() {
			var option = {
				path: 'api/flow',
				params: {
					method: 'get'
				},
				success: function(data) {
					$scope.data2 = data;
				}
			};
			$schttp.postAsync(option);
		}
		
		//*归属地查询*/
		$schttp.postAsync({
			path: 'api/flow',
			params: {
				method: 'attribute'
			},
			success: function(data) {
				$scope.type=data.typeId;
			}				
		});

		$scope.list1=[10,30,70,150,500];   //联通
		$scope.list2=[20,50,100,200,500];  //移动
		$scope.list3=[10,30,50,100,200,500];  //电信
		$scope.onSelected=function(item){
		    $scope.flow=item;
	   }

	}]);

})(window);