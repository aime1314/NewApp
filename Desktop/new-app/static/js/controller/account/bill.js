/*
 *	我的-资金明细
 */
var moduleName = 'billControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$config', function($scope, $schttp, $config) {
		var pageIndex = 0;
		$scope.cur_status = $config.load.type.start;		
		$scope.list = [];
		$scope.load = load;
		
		var type = 0;
		$scope.type = 0;//默认获取所有
		var option = {
			path: 'api/user',
			params: {
				method: 'funds',
				data: {
					rows: $config.load.rows,
					type: $scope.type
				}
			},
			success: function(data) {
				var list = data || [];
				Array.prototype.push.apply($scope.list, list);
				if (list.length < $config.load.rows) {
					$scope.cur_status = $config.load.type.end;
				} else {
					$scope.cur_status = $config.load.type.start;
				}
			}
		};
		
		function load() {
			if (type == $scope.type) {
				if ($scope.cur_status > $config.load.type.start) 
					return;
			} else {
				$scope.cur_status = $config.load.type.start;
				pageIndex = 0;
				$scope.list = [];
			}
			type = $scope.type;
			pageIndex++;
			option.params.data.page = pageIndex;
			option.params.data.type = type;
			$scope.cur_status = $config.load.type.processing;
			$schttp.postAsync(option);			
		};
		load();
	}]);

})(window);