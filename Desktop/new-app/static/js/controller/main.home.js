/*
 *	首页
 */
var moduleName = 'homeControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$util', '$stateParams', '$schttp', '$state', function($scope, $util, $stateParams, $schttp, $state) {
		//获取标的信息
		$scope.list = [];
		var option = {
			path: 'api/bid',
			params: {
				method: 'index'
			},
			success: function(data) {
				$scope.list = data;
			}
		};
		$schttp.load(option);
		
		//获取最新系统公告
		$scope.placard = {};
		var option = {
			path: 'api/news',
			params: {
				method: 'index'
			},
			success: function(data) {
				$scope.placard = data;
			}
		};
		$schttp.postAsync(option);		
		
		$scope.goDetail = function(nb_type, nb_id) {
			var toState = '';
			switch (nb_type) {
				case 1:
					toState = 'ttsc';
					break;
				case 2:
					toState = 'common';
					break;
				case 3:
					toState = 'commonTransfer';
					break;
			}
			$state.go(toState, {nb_id: nb_id});
		};


		/*APP下载*/
		var tagShow = $util.getParams('appTagShow'),
 			isShow = tagShow.isShow === undefined;
 		$scope.isNewApp = $util.isApp();
 		$scope.isShow = isShow;

		$scope.tagClose = function() {
 			$util.setParams('appTagShow', {
 				isShow: true
 			});
 			$scope.isShow = false;
 		};
	}]);

})(window);