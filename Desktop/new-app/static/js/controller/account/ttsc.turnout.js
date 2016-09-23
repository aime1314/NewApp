/*
 *	我的-天天生财-转出明细
 */
var moduleName = 'ttscTurnoutControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$config', '$util', function($scope, $schttp, $config, $util) {
		var pageIndex = 0;
		$scope.cur_status = $config.load.type.start;		
		$scope.list = [];
		$scope.load = load;
		var option = {
			path: 'api/ttsc',
			params: {
				method: 'transfer',
				data: {
					rows: $config.load.rows,
					type: 0
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
			option.params.data.p_id = $util.getParams('pid');
			$scope.cur_status = $config.load.type.processing;
			$schttp.postAsync(option);
		}
		
		var lock = true;
		$scope.$on('sendPid', function(event, p_id) {
			$util.setParams('pid', p_id, true);
			lock = false;
			$scope.list = [];
			pageIndex = 0;			
			_reload();
		});
		
		function _reload() {
			if ($util.getParams('pid')) {
				load();
			}
		}
		if (!lock) {
			_reload();
		}
	}]);

})(window);