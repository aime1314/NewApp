/*
 *	标的扩展信息-投资记录
 */
var moduleName = 'investLogControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$stateParams', '$config', function($scope, $schttp, $stateParams, $config) {
		var pageIndex = 0;
		$scope.cur_status = $config.load.type.start;
		$scope.list = [];
		var path = ($stateParams.nb_type == 2 && 'api/bid') || 'api/debt';
		
		$scope.load = load;
		var option = {
			path: path,
			params: {
				method: 'record',
				data: {
					rows: $config.load.rows,
					nb_id: $stateParams.nb_id
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