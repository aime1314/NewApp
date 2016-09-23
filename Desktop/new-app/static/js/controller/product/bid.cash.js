/*
 *	理财-投标-红包选择
 */
var moduleName = 'bidCashControl';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.controller(moduleName, ['$scope', '$schttp', '$config', '$stateParams', '$util', '$location', '$state', function($scope, $schttp, $config, $stateParams, $util, $location, $state) {
		$scope.pick = function(item) {
			$util.setParams('upbd_id', item.upbd_id, true);
			$util.setParams('scc_id', item.scc_id, true);
			$util.setParams('bonus_amount', item.amount, true);
			$state.go('common', {nb_id: $stateParams.nb_id});
			$location.replace();
		};
		
		var pageIndex = 0;
		$scope.cur_status = $config.load.type.start;		
		$scope.list = [];
		$scope.upcoming = '';
		$scope.load = load;
		var option = {
			path: 'api/voucher',
			params: {
				method: 'lists',
				data: {
					rows: $config.load.rows,
					status: 1,
					bid_amount: $stateParams.bid_amount
				}
			},
			success: function(data) {
				$scope.upcoming = data.upcoming;
				var list = data.list || [];
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