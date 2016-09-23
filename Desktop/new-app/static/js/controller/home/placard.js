/*
 *	首页-系统公告
 */
var moduleName = 'placardControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$config', function($scope, $schttp, $config) {
		var pageIndex = 0;
		$scope.cur_status = $config.load.type.start;
		$scope.list = [];
		
		$scope.load = load;
		var option = {
			path: 'api/news',
			params: {
				method: 'notice',
				data: {
					rows: $config.load.rows
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
			if ($scope.cur_status > $config.load.type.start) 
				return;
			pageIndex++;
			option.params.data.page = pageIndex;
			$scope.cur_status = $config.load.type.processing;
			if (pageIndex == 1)//只做一页数据缓存
				$schttp.load(option);
			else
				$schttp.postAsync(option);
		}
		load();
	}]);

})(window);