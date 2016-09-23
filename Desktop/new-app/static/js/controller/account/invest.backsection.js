/*
 *	我的-我的投资-回款中
 */
var moduleName = 'investBacksectionControl';
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
			path: 'api/invest',
			params: {
				method: 'lists',
				data: {
					rows: $config.load.rows,
					type: 2
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
			$schttp.postAsync(option);
		}
		load();	
		
	}]);

})(window);