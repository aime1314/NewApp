/*
 *	我的-设置-密码管理
 */
var moduleName = 'passwordControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$native', '$config', '$promise', '$util', '$ui', '$state', function($scope, $native, $config, $promise, $util, $ui, $state) {
		//非app屏蔽手势密码
		$scope.gesture_show = false;
		$scope.is_gesture = false;
		if ($util.isApp()) {
			$scope.gesture_show = true;
			//获取手势密码状态，请求原生
	        var option = {
	            cmd: $config.cmd.read,
	            key: $config.gesture.status,
	            value: {},
	            callback: function(data) {//1success0failed
	            	if (parseInt(data) == 1) {
	            		$scope.$apply(function() {
	            			$scope.is_gesture = true;
	            		});
	            	}
	            }
	        };		
			$native.callNative(option);
		}
		
		//创建手势密码
		$scope.createGesture = function() {
			if (!$scope.gesture_show) 
				return;
			if ($scope.is_gesture) {
				//弹框
				$ui.alertShow('提示', 3, '确定', function() {
					//关闭手势密码
				    option = {
			            cmd: $config.cmd.gesture,
			            key: $config.gesture.remove,
			            value: {},
			            callback: function() {//不成功不回调
			                $scope.is_gesture = false;
			                $promise.logout();
			            }
			        };	
			        $native.callNative(option);				
				}, '取消', null);
			} else {
				//创建手势密码
			    option = {
		            cmd: $config.cmd.gesture,
		            key: $config.gesture.create,
		            value: {},
		            callback: function() {//不成功不回调
		                $scope.is_gesture = true;
		            }
		        };	
		        $native.callNative(option);				
			}
		};
		
		//修改手势密码
		$scope.modifyGesture = function() {
			if (!$scope.gesture_show) 
				return;		
			if (!$scope.is_gesture)
				return;
		    option = {
	            cmd: $config.cmd.gesture,
	            key: $config.gesture.modify,
	            value: {}
	        };					
			$native.callNative(option);
		};
		
		$scope.is_auth = false;
		$scope.auth_status = '状态更新中';
		$promise.promiseAuth().then(function() {
			$scope.is_auth = true;
			$scope.auth_status = '已设置';
		}, function() {
			$scope.auth_status = '未设置';
		});
		
		//修改/重置支付密码
		$scope.resetPayPassword = function() {
			if (!$scope.is_auth) 
				$state.go('auth', {fromState:'password'});
			else 
				$state.go('resetPayPassword', {fromState:'password'});
		};
	}]);

})(window);