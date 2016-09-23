/*
 * 天天生财图表
 */
var moduleName = 'ttscChart';
module.exports = moduleName;

(function() {

	'use strict';
	
	var mainApp = angular.module('mainApp');
	
    mainApp.directive(moduleName, [function() {
        var obj = {
            restrict: 'AE',
            replace: true,
            scope: { x: '@', y: '@' },
            link: function(scope, element, attrs) {
            	scope.$watch('x', function(n, o) {
            		if (n != o) {
            			var hq_x = angular.fromJson(scope.x);
            			var hq_y = [];
            			var height_frm = $('body').height();
						element.css('height', height_frm/3);
						angular.forEach(angular.fromJson(scope.y), function(v) {
							this.push(parseFloat(v));
						}, hq_y);
						var config = getHighCharts(hq_x, hq_y);
						$(element).highcharts(config);            		
            		}
            	});
            }
        }
        
        function getHighCharts(hq_x, hq_y) {
       		var mycharts = {
        		/*chart: {
        			renderTo: 'chartMain',
        			type: 'area',
        			backgroundColor: 'rgba(255, 255, 255,1)',
        			plotBorderWidth: 1,
        			marginRight: 10
        		},*/
        		title: {
        			text: ''
        		},
        		credits: {
        			enabled: false
        		},
        		/*legend: {
        			enabled: false
        		},
        		tooltip: {
        			xDateFormat: '%Y-%m-%d',
        			shared: true
        		},
        		tooltip: {
        			crosshairs: [{
        				width: 1,
        				color: 'rgba(9,157,221,0.8)'
        			},{
        				width: 1,
        				color: 'rgba(9,157,221,0.8)'
        			}],
        			style: {
        				color: '#333333',
        				fontSize: '12px',
        				padding: '8px'
        			},
        			backgroundColor: '#ff9900',
        			borderWidth: 0,
        			borderColor: 0,
        			borderRadius: 30,
        			shared: false,
        			useHTML: true,
        			pointFormat: '<span>{point.y}%</span>',
        			valueDecimals: 4
        		},
        		plotOptions: {
        			series: {
        				color: 'rgba(9,157,221,0.2)',
        				allowPointSelect: true
        			}
        		},*/
        		xAxis: {
        			gridLineDashStyle: 'Dash',
        			gridLineColor: '#d2dade',
        			gridLineWidth: 1,
        			lineColor: '#d2dade',
        			categories: hq_x,
        			allowDecimals: true,
        			tickmarkPlacement: 'on',//刻度对齐
        			labels: {
        				align: 'center',
        				step:1
        			}
        		},
  				yAxis: {
        		 	gridLineDashStyle: 'Dash',
        		 	gridLineColor: '#d2dade',
        		 	floor: 0,
        		 	minPadding: 0.2,
        		 	allowDecimals: false,
        		 	lineColor: '#d2dade',
        		 	title: { text: '' },
        		 	labels: {
        		 		formatter: function() {
        		 			return this.value + '%';  // .00
        		 		},
        		 		x: -10,
        		 		y: 0
        		 	}
        		},
        		series: [{
        			showInLegend: false,
        			name: '年化率',
        			data: hq_y
        		}]
        	};
        	return mycharts;
        }
        
    	return obj;
    }]);
})(window);