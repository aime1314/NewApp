var moduleName = 'mainApp';
module.exports = moduleName;

(function(win) {
	
	'use strict';
	
	var mainApp = angular.module(moduleName, ['ui.router']);
	
	mainApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
		$urlRouterProvider.otherwise(_getDefaultRouter());
		$stateProvider.state('home', {//首页main.home
			url: '/home',
			templateUrl: 'home.html',
			controller: 'homeControl'
		}).state('product', {//理财main.product
			url: '/product',
			templateUrl: 'product.html',
			controller: 'productControl'		
		}).state('account', {//我的main.account
			url: '/account',
			templateUrl: 'account.html',
			controller: 'accountControl',
			resolve: loginResolve('account')
		}).state('more', {//更多main.more
			url: '/more',
			templateUrl: 'more.html',
			controller: 'moreControl'		
		}).state('login', {//登录/launch/login
			url: '/login/:fromState',
			params: {nb_id:null},
			templateUrl: 'login.html',
			controller: 'loginControl',
			resolve: logoutResolve()
		}).state('register', {//注册/launch/register
			url: '/register',
			templateUrl: 'register.html',
			controller: 'registerControl',
			resolve: logoutResolve()
		}).state('resetLoginPassword', {//重置登录密码/launch/loginpassword.reset
			url: '/resetLoginPassword',
			templateUrl: 'resetLoginPassword.html',
			controller: 'resetLoginPasswordControl'
		}).state('modifyLoginPassword', {//修改登录密码/launch/loginpassword.modify
			url: '/modifyLoginPassword',
			templateUrl: 'modifyLoginPassword.html',
			controller: 'modifyLoginPasswordControl',
			resolve: loginResolve('password')
		}).state('summary', {//首页-国资背景/资金安全/灵活变现/高收益/home/summary
			url: '/summary/:type',
			templateUrl: 'summary.html',
			controller: 'summaryControl'		
		}).state('product.plan', {//理财-生财计划/product/plan
			url: '/plan',
			templateUrl: 'plan.html',
			controller: 'planControl'		
		}).state('product.scatter', {//理财-散标专区/product/scatter
			url: '/scatter',
			templateUrl: 'scatter.html',
			controller: 'scatterControl'		
		}).state('product.transfer', {//理财-转让专区/product/transfer
			url: '/transfer',
			templateUrl: 'transfer.html',
			controller: 'transferControl'		
		}).state('common', {//普通标详情/product/bid.detail.common
			url: '/common/:nb_id',
			templateUrl: 'common.html',
			controller: 'commonControl'		
		}).state('commonTransfer', {//债转标详情/product/bid.detail.transfer
			url: '/commonTransfer/:nb_id',
			templateUrl: 'commonTransfer.html',
			controller: 'commonTransferControl'		
		}).state('ttsc', {//天天生财详情/product/bid.detail.ttsc
			url: '/ttsc/:nb_id',
			templateUrl: 'ttsc.html',
			controller: 'ttscControl'		
		}).state('productInfo', {//标的扩展信息-产品信息/product/bid.product.info
			url: '/productInfo/:nb_id',
			templateUrl: 'productInfo.html',
			controller: 'productInfoControl'		
		}).state('productInfoTransfer', {//标的扩展信息-产品信息-债权转让/product/bid.product.info.transfer
			url: '/productInfoTransfer/:nb_id',
			templateUrl: 'productInfoTransfer.html',
			controller: 'productInfoTransferControl'		
		}).state('repaymentPlan', {//标的扩展信息-还款计划/product/bid.repayment.plan
			url: '/repaymentPlan/:nb_id/:nb_type',
			templateUrl: 'repaymentPlan.html',
			controller: 'repaymentPlanControl'		
		}).state('investLog', {//标的扩展信息-投资记录/product/bid.invest.log
			url: '/investLog/:nb_id/:nb_type',
			templateUrl: 'investLog.html',
			controller: 'investLogControl'		
		}).state('settings', {//我的-设置/account/settings
			url: '/settings',
			templateUrl: 'settings.html',
			controller: 'settingsControl',
			resolve: loginResolve('settings')
		}).state('bill', {//我的-资金明细/account/bill
			url: '/bill',
			templateUrl: 'bill.html',
			controller: 'billControl',
			resolve: loginResolve('bill')
		}).state('assetsDetail', {//我的-资产详情/account/assets.detail
			url: '/assetsDetail',
			templateUrl: 'assetsDetail.html',
			controller: 'assetsDetailControl',
			resolve: loginResolve('assetsDetail')
		}).state('password', {//我的-密码管理/account/password
			url: '/password',
			templateUrl: 'password.html',
			controller: 'passwordControl',
			resolve: loginResolve('password')
		}).state('resetPayPassword', {//我的-密码管理-重置支付密码/account/settings.paypassword.resset
			url: '/resetPayPassword/:fromState',
			templateUrl: 'resetPayPassword.html',
			controller: 'resetPayPasswordControl',
			resolve: angular.extend(loginResolve('resetPayPassword'), authResolve('resetPayPassword'))
		}).state('addBankCard', {//我的-我的银行卡-添加银行卡/account/bankcard.add
			url: '/addBankCard/:fromState',
			templateUrl: 'addBankCard.html',
			controller: 'addBankCardControl',
			resolve: angular.extend(loginResolve('addBankCard'), authResolve('addBankCard'), noCardBindResolve)
		}).state('reviewBankCard', {//我的-设置-我的银行卡/account/bankcard.review
			url: '/reviewBankCard',
			templateUrl: 'reviewBankCard.html',
			controller: 'reviewBankCardControl',
			resolve: angular.extend(loginResolve('reviewBankCard'), authResolve('reviewBankCard'), cardBindResolve('reviewBankCard'))
		})/*.state('scanCode', {//我的-二维码/account/scan.code
			url: '/scanCode',
			templateUrl: 'scanCode.html',
			controller: 'scanCodeControl',
			resolve: loginResolve('scanCode')
		})*/.state('feedback', {//我的-设置-意见反馈-列表/account/settings.feedback
			url: '/feedback',
			templateUrl: 'feedback.html',
			controller: 'feedbackControl',
			resolve: loginResolve('feedback')
		}).state('feedbackEdit', {//我的-设置-意见反馈-写意见/account/settings.feedback.edit
			url: '/feedbackEdit',
			templateUrl: 'feedbackEdit.html',
			controller: 'feedbackEditControl',
			resolve: loginResolve('feedbackEdit')
		}).state('feedbackDetail', {//我的-设置-意见反馈-意见详情/account/settings.feedback.detail
			url: '/feedbackDetail/:c_id',
			templateUrl: 'feedbackDetail.html',
			controller: 'feedbackDetailControl',
			resolve: loginResolve('feedbackDetail')
		}).state('about', {//更多-关于我们/more/about
			url: '/about',
			templateUrl: 'about.html',
			controller: 'aboutControl'
		}).state('placard', {//首页-系统公告/home/placard
			url: '/placard',
			templateUrl: 'placard.html',
			controller: 'placardControl'
		}).state('placardDetail', {//首页-系统公告-详情/home/placard.detail
			url: '/placardDetail/:hp_id',
			templateUrl: 'placardDetail.html',
			controller: 'placardDetailControl'
		})/*.state('bidCash', {//理财-投标-红包选择/product/bid.cash
			url: '/bidCash/:nb_id/:bid_amount',
			templateUrl: 'bidCash.html',
			controller: 'bidCashControl',
			resolve: loginResolve('bidCash')
		}).state('cashExplanation', {//理财-投标-红包选择-红包说明/product/cash.explanation
			url: '/cashExplanation',
			templateUrl: 'cashExplanation.html',
			controller: 'cashExplanationControl'
		})*/.state('flow', {//我的-我的流量/account/flow
			url: '/flow',
			templateUrl: 'flow.html',
			controller: 'flowControl',
			resolve: loginResolve('flow')
		}).state('flowDetail', {//我的-我的流量-查看详情/account/flow.detail
			url: '/flowDetail',
			templateUrl: 'flowDetail.html',
			controller: 'flowDetailControl',
			resolve: loginResolve('flowDetail')
		}).state('flowDetail.income', {//我的-我的流量-查看详情-收入/account/flow.detail.income
			url: '/flowDetailIncome',
			templateUrl: 'flowDetailIncome.html',
			controller: 'flowDetailIncomeControl',
			resolve: loginResolve('flowDetail.income')
		}).state('flowDetail.expend', {//我的-我的流量-查看详情-支出/account/flow.detail.expend
			url: '/flowDetailExpend',
			templateUrl: 'flowDetailExpend.html',
			controller: 'flowDetailExpendControl',
			resolve: loginResolve('flowDetail.expend')
		})/*.state('flowRecharge', {//我的-我的流量-余额充流量/account/flow.recharge
			url: '/flowRecharge',
			templateUrl: 'flowRecharge.html',
			controller: 'flowRechargeControl',
			resolve: loginResolve('flowRecharge')
		})*/.state('flowHandsel', {//我的-我的流量-转增好友/account/flow.handsel
			url: '/flowHandsel',
			templateUrl: 'flowHandsel.html',
			controller: 'flowHandselControl',
			resolve: loginResolve('flowHandsel')
		}).state('flowFetch', {//我的-我的流量-提取到手机/account/flow.fetch
			url: '/flowFetch',
			templateUrl: 'flowFetch.html',
			controller: 'flowFetchControl',
			resolve: loginResolve('flowFetch')
		}).state('recharge', {//我的-我要充值/account/recharge
			url: '/recharge',
			templateUrl: 'recharge.html',
			controller: 'rechargeControl',
			resolve: angular.extend(loginResolve('recharge'), authResolve('recharge'), cardBindResolve('recharge'))
		}).state('withdraw', {//我的-我要提现/account/withdraw
			url: '/withdraw',
			templateUrl: 'withdraw.html',
			controller: 'withdrawControl',
			resolve: angular.extend(loginResolve('withdraw'), authResolve('withdraw'), cardBindResolve('withdraw'))
		})/*.state('punch', {//我的-我要签到/account/punch
			url: '/punch',
			templateUrl: 'punch.html',
			controller: 'punchControl',
			resolve: loginResolve('punch')
		})*/.state('invest', {//我的-散标专区/account/invest
			url: '/invest',
			templateUrl: 'invest.html',
			controller: 'investControl',
			resolve: loginResolve('invest')
		}).state('invest.processing', {//我的-散标专区-投资中/account/invest.processing
			url: '/investProcessing',
			templateUrl: 'investProcessing.html',
			controller: 'investProcessingControl',
			resolve: loginResolve('invest.processing')
		}).state('invest.backsection', {//我的-散标专区-回款中/account/invest.backsection
			url: '/investBacksection',
			templateUrl: 'investBacksection.html',
			controller: 'investBacksectionControl',
			resolve: loginResolve('invest.backsection')
		}).state('invest.end', {//我的-散标专区-已结束/account/invest.end
			url: '/investEnd',
			templateUrl: 'investEnd.html',
			controller: 'investEndControl',
			resolve: loginResolve('invest.end')
		}).state('investDetail', {//我的-散标专区-回款中、正常结清详情/account/invest.detail
			url: '/investDetail/:ndd_id/:type',
			templateUrl: 'investDetail.html',
			controller: 'investDetailControl',
			resolve: loginResolve('investDetail')
		}).state('bustDetail', {//我的-散标专区-流标详情/account/invest.detail.bust
			url: '/bustDetail/:nbd_id',
			templateUrl: 'bustDetail.html',
			controller: 'bustDetailControl',
			resolve: loginResolve('bustDetail')
		}).state('debtTransfer', {//我的-散标专区-详情-债权转让/account/debt.transfer
			url: '/debtTransfer/:ndd_id',
			templateUrl: 'debtTransfer.html',
			controller: 'debtTransferControl',
			resolve: loginResolve('debtTransfer')
		}).state('debtTransferGains', {//我的-散标专区-详情-债权转让-收益计划/account/debt.transfer.gains
			url: '/debtTransferGains/:nbd_id',
			templateUrl: 'debtTransferGains.html',
			controller: 'debtTransferGainsControl',
			resolve: loginResolve('debtTransferGains')
		}).state('debtTransferRule', {//债权转让规则/account/debt.transfer.rule
			url: '/debtTransferRule',
			templateUrl: 'debtTransferRule.html',
			controller: 'debtTransferRuleControl'
		})/**.state('cash', {//我的-我的红包/account/cash
			url: '/cash',
			templateUrl: 'cash.html',
			controller: 'cashControl',
			resolve: loginResolve('cash')
		}).state('cash.valid', {//我的-我的红包-未使用/account/cash.valid
			url: '/cashValid',
			templateUrl: 'cashValid.html',
			controller: 'cashValidControl',
			resolve: loginResolve('cash.valid')
		}).state('cash.used', {//我的-我的红包-已使用/account/cash.used
			url: '/cashUsed',
			templateUrl: 'cashUsed.html',
			controller: 'cashUsedControl',
			resolve: loginResolve('cash.used')
		}).state('cash.invalid', {//我的-我的红包-已过期/account/cash.invalid
			url: '/cashInvalid',
			templateUrl: 'cashInvalid.html',
			controller: 'cashInvalidControl',
			resolve: loginResolve('cash.invalid')
		}).state('cashExchange', {//我的-我的红包-红包兑换/account/cash.exchange
			url: '/cashExchange',
			templateUrl: 'cashExchange.html',
			controller: 'cashExchangeControl',
			resolve: loginResolve('cashExchange')
		})*/.state('auth', {//我的-设置-实名认证/account/settings.auth
			url: '/auth/:fromState',
			templateUrl: 'auth.html',
			controller: 'authControl',
			resolve: angular.extend(loginResolve('auth'), noAuthResolve())
		}).state('ttscAccount', {//我的-天天生财/account/ttsc.account
			url: '/ttscAccount',
			templateUrl: 'ttscAccount.html',
			controller: 'ttscAccountControl',
			resolve: loginResolve('ttscAccount')
		}).state('ttscAccount.ttscIncome', {//我的-天天生财-收益明细/account/ttsc.income
			url: '/ttscIncome',
			templateUrl: 'ttscIncome.html',
			controller: 'ttscIncomeControl',
			resolve: loginResolve('ttscIncome')
		}).state('ttscAccount.ttscTurnin', {//我的-天天生财-转入明细/account/ttsc.turnin
			url: '/ttscTurnin',
			templateUrl: 'ttscTurnin.html',
			controller: 'ttscTurninControl',
			resolve: loginResolve('ttscTurnin')
		}).state('ttscAccount.ttscTurnout', {//我的-天天生财-转出明细/account/ttsc.turnout
			url: '/ttscTurnout',
			templateUrl: 'ttscTurnout.html',
			controller: 'ttscTurnoutControl',
			resolve: loginResolve('ttscTurnout')
		}).state('ttscTransferout', {//我的-天天生财-转出/account/ttsc.transferout
			url: '/ttscTransferout/:uis_total/:p_id',
			templateUrl: 'ttscTransferout.html',
			controller: 'ttscTransferoutControl',
			resolve: loginResolve('ttscTransferout')
		}).state('upgrade', {//老app升级，跳转到升级页面即可
			url: '/upgrade',
			templateUrl: 'upgrade.html',
			controller: 'upgradeControl'		
		}).state('oldandroid', {//老版本android升级
			url: '/oldandroid',
			templateUrl: 'oldandroid.html',
			controller: 'oldandroidControl'		
		}).state('activity1', {
			url: '/activity1',
			templateUrl: 'activity1.html',
			controller: 'activity1Control',
		}).state('investment', {
			url: '/investment',
			templateUrl: 'investment.html'
		}).state('investmentb', {
			url: '/investmentb',
			templateUrl: 'investmentb.html'
		}).state('landing', {
			url: '/landing',
			templateUrl: 'landing.html'
		});
		
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$httpProvider.interceptors.push(['$rootScope', '$q', '$location', 
			function($rootScope, $q, $location) {
			var obj = {
				request: function(config) {
					$rootScope.loading = true;
          			config.requestTimestamp = new Date().getTime();
					return config;
				},
				requestError: function(rejection) {
					return $q.reject(rejection);
				},
	          	response: function (response) {
	              	$rootScope.loading = false;
	              	response.config.responseTimestamp = new Date().getTime();
	              	return response;
	          	}				
			};
			return obj;
		}]);		
	}]);
	
	function _getDefaultRouter() {
		var defaultRouter = '/home';
		if (navigator.userAgent.indexOf('shengcai_hybird') > -1 && navigator.userAgent.indexOf('Android') > -1) {
			defaultRouter = '/oldandroid';
		}/* else {//新版本app壳子升级
			if (navigator.userAgent.indexOf('shengcaijinrong_') > -1) {
				var curVersion = 1;
				var appUA = navigator.userAgent;
				var useVersion = appUA.substring(0, appUA.indexOf(" "));
				useVersion = useVersion.substring(useVersion.lastIndexOf('_')+1);
				if (curVersion > parseInt(useVersion)) {
					defaultRouter = '/upgrade';
				}
			}
		}*/
		return defaultRouter;
	}
	
	mainApp.run(['$rootScope', '$state', '$ui', '$config', '$account', '$schttp', '$location', function($rootScope, $state, $ui, $config, $account, $schttp, $location) {
	    //页面初始化滚动条设置
	    $rootScope.$on('$stateChangeSuccess', function() {
	    	//旧app不允许路由跳转，必须强制升级
	    	if (navigator.userAgent.indexOf('shengcai_') > -1 && navigator.userAgent.indexOf('Android') > -1) {
	    		$state.go('oldandroid');
	    	}
	    	$schttp.reset();
	      	var top = $(document).scrollTop();
	      	if (top > 0)
				$(document).scrollTop(0);
			//记录brandID\url_referrer等
			var url = $location.url();
			if (url.indexOf('brandID') > -1) {
				if (localStorage['brandID']) {
					if (localStorage['brandID_time'] && ((parseInt(localStorage['brandID_time'])-new Date().getTime())/(24 * 60 * 60 * 1000)) > 7) {
						var brandID = url.substring(url.indexOf('brandID')+7+1);
						localStorage.setItem('brandID', brandID);
						localStorage.setItem('brandID_time', new Date().getTime());						
					}
				} else {
					var brandID = url.substring(url.indexOf('brandID')+7+1);
					localStorage.setItem('brandID', brandID);
					localStorage.setItem('brandID_time', new Date().getTime());				
				}
			}
			if (document.referrer) {
				if (localStorage['url_referrer']) {
					if (localStorage['url_referrer_time'] && ((parseInt(localStorage['url_referrer_time'])-new Date().getTime())/(24 * 60 * 60 * 1000)) > 7) {
						localStorage.setItem('url_referrer', document.referrer);
						localStorage.setItem('burl_referrer_time', new Date().getTime());						
					}
				} else {
					localStorage.setItem('url_referrer', document.referrer);
					localStorage.setItem('url_referrer_time', new Date().getTime());				
				}
			}
			//end 记录brandID\url_referrer等
	    });	
	    	
		window.addEventListener('online', function() {
			sessionStorage.setItem($config.sessionKey.online, '1');
			$state.reload();
		});
		
		window.addEventListener('offline', function() {
			sessionStorage.setItem($config.sessionKey.online, '0');
			$ui.toastShow($config.systemMsg.offline, 2000);
		});
	}]);
	
	mainApp.animation('.repeat-animation', ['$state', function($state) {
		return {
			enter: function(element, done) {
				if (!$state.includes('home') && !$state.includes('product.*') && !$state.includes('account') && !$state.includes('more'))
					element.addClass('ng-enter');
				done();		
			},
			leave: function(element, done) {
				element.removeClass('ng-enter');
				done();
			},
			move: function(element, done) {
				done();
			}
		}
	}]);	
	
	function loginResolve(state) {
		return {
			promiseLogin: ['$promise', '$state', function($promise, $state) {
				return $promise.promiseLogin().then(function() {
					
				}, function() {
					$state.go('login', {fromState:state});
				});
			}]
		}
	}
	
	function logoutResolve() {
		return {
			promiseLogout: ['$promise', function($promise) {
				return $promise.promiseLogout();
			}]
		}
	}
	
	function authResolve(state) {
		return {
			promiseAuth: ['$promise', '$state', function($promise, $state) {
				return $promise.promiseAuth().then(function() {
				}, function() {
					$state.go('auth', {fromState:state});
				});
			}]
		}	
	}
	
	function noAuthResolve() {
		return {
			promiseNoAuth: ['$promise', function($promise) {
				return $promise.promiseNoAuth();
			}]
		}	
	}
	
	function cardBindResolve(state) {
		return {
			promiseCardBind: ['$promise', '$state', function($promise, $state) {
				return $promise.promiseCardBind().then(function() {
				}, function() {
					$state.go('addBankCard', {fromState:state});
				});
			}]
		}	
	}	
	
	function noCardBindResolve() {
		return {
			promiseNoCardBind: ['$promise', function($promise) {
				return $promise.promiseNoCardBind();
			}]
		}	
	}
	
})(window);