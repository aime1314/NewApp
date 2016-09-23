/*
 *	我的-我的投资-已结束
 */
var moduleName = 'investEndControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$config', '$state', function($scope, $schttp, $config, $state) {
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
					type: 3
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
		
		$scope.redirect = function(item) {
			if (item.type==1) {
				//正常还款结清
				$state.go('investDetail', {ndd_id:item.ndd_id, type:1});
			} else {
				//流标
				$state.go('bustDetail', {nbd_id: item.nbd_id});
			}
		};
	}]);

})(window);