var moduleName = 'ui';
module.exports = moduleName;

(function(win) {
	
	'use strict';
	
	var mainApp = angular.module('mainApp');
	
	mainApp.factory('$ui', ['$rootScope', '$compile', '$config', '$timeout', function($rootScope, $compile, $config, $timeout) {
		//toast
		var $toastDirective = null;
		//alert/confirm etc.
		var template = _getTemplate(),
			$node = $(template),
			$cover = $node.find('[name="cover"]'),
			$content = $node.find('[name="content"]'),
			$title = $node.find('[name="title"]'),
			$alert = $node.find('[name="alert"]'),
			$confirm = $node.find('[name="confirm"]'),
			$btnSure = $node.find('[name="btn_sure"]'),
			$btnCancel = $node.find('[name="btn_cancel"]');
		$('body').append($node);	
		var lock = false;
		var obj = {
			unlock: function() {
				lock = false;
			},
			toastShow: function(msg, time, callback) {
				if (!$toastDirective) {
					var toastDirective = '<toast></toast>';
					$toastDirective = $compile(toastDirective)($rootScope);
					$('body').append($toastDirective);	
				}
				if (angular.isFunction(time)) {
					callback = time;
					time = null;
				}
				$rootScope.$broadcast($config.emit.toastShow, msg, time, callback)
			},
			alertShow: function(title, index, btnSureText, fnSure, btnCancelText, fnCancel) {
				$confirm.hide();
				$alert.show();
				$btnCancel.unbind().bind('click', function() {
					if (angular.isFunction(fnCancel))
						fnCancel();
					_hide();
				});
				$btnSure.unbind().bind('click', function() {
					if (angular.isFunction(fnSure))
						fnSure();
					_hide();
				});
				_showAlert(title, index, btnSureText, btnCancelText);		
			},
			alertShow2: function(title, msg, btnSureText, fnSure, btnCancelText, fnCancel) {
				$confirm.hide();
				$alert.show();
				$btnCancel.unbind().bind('click', function() {
					if (angular.isFunction(fnCancel))
						fnCancel();
					_hide();
				});
				$btnSure.unbind().bind('click', function() {
					if (angular.isFunction(fnSure))
						fnSure();
					_hide();
				});
				_showAlert2(title, msg, btnSureText, btnCancelText);		
			},
			confirmPayShow: function(title, btnSureText, fnSure, btnCancelText, fnCancel, fnResetPassword, tips) {
				this.unlock();
				$alert.hide();
				$confirm.show();
				$node.find('[name="flow_div"]').remove();
				$node.find('[name="pwd_div"]').show();
				$node.find('[name="href_box"]').show();
				if (tips) {
					$node.find('[name="tips"]').show();
					$node.find('[name="tips_inner"]').text(tips);
				}
				$node.find('[name="forget_pwd"]').unbind().bind('click', function() {
					if (angular.isFunction(fnResetPassword))
						fnResetPassword();
					_hide();
				});
				$btnCancel.unbind().bind('click', function() {
					if (angular.isFunction(fnCancel))
						fnCancel();
					_hide();
				});
				$btnSure.unbind().bind('click', function() {
					if (lock) return;
					if (angular.isFunction(fnSure)) {
						lock = true;
						fnSure($node.find('[name="password"]').val());
					}
					//_hide();
				});
				_showConfirm(title, btnSureText, btnCancelText);			
			},
			confirmPasswordShow: function(title, btnSureText, fnSure, btnCancelText, fnCancel, fnResetPassword) {
				this.unlock();
				$alert.hide();
				$confirm.show();
				$node.find('[name="flow_div"]').remove();
				$node.find('[name="tips"]').remove();
				$node.find('[name="pwd_div"]').show();
				$node.find('[name="href_box"]').show();
				$node.find('[name="forget_pwd"]').unbind().bind('click', function() {
					if (angular.isFunction(fnResetPassword))
						fnResetPassword();
					_hide();
				});
				$btnCancel.unbind().bind('click', function() {
					if (angular.isFunction(fnCancel))
						fnCancel();
					_hide();
				});
				$btnSure.unbind().bind('click', function() {
					if (lock) return;
					if (angular.isFunction(fnSure)) {
						lock = true;
						fnSure($node.find('[name="password"]').val());
					}
					//_hide();
				});
				_showConfirm(title, btnSureText, btnCancelText);			
			},
			confirmFlowShow: function(title, btnSureText, fnSure, btnCancelText, fnCancel) {
				this.unlock();
				$alert.hide();
				$confirm.show();
				$node.find('[name="pwd_div"]').remove();
				$node.find('[name="href_box"]').remove();
				$node.find('[name="flow_div"]').show();
				$btnCancel.unbind().bind('click', function() {
					if (angular.isFunction(fnCancel))
						fnCancel();
					_hide();
				});
				$btnSure.unbind().bind('click', function() {
					if (lock) return;
					if (angular.isFunction(fnSure)) {
						lock = true;
						fnSure($node.find('[name="flow"]').val());
					}
					_hide();
				});
				_showConfirm(title, btnSureText, btnCancelText);			
			},
			hide: _hide
		};
		
		function _showAlert(title, index, btnSureText, btnCancelText) {
			$title.text(title);
			$btnSure.text(btnSureText);
			$btnCancel.text(btnCancelText);
			$alert.find('[name="msg_p"]').eq(index).show().siblings('[name="msg_p"]').hide();
			$cover.show();
			$content.show();
		}
		
		function _showAlert2(title, msg, btnSureText, btnCancelText) {
			$title.text(title);
			$btnSure.text(btnSureText);
			$btnCancel.text(btnCancelText);
			$alert.find('[name="msg_p"]').eq(0).text(msg).show().siblings('[name="msg_p"]').hide();
			$cover.show();
			$content.show();
		}
	
		function _showConfirm(title, btnSureText, btnCancelText) {
			$title.text(title);
			$btnSure.text(btnSureText);
			$btnCancel.text(btnCancelText);
			$cover.show();
			$content.show();
		}
		
		function _hide() {
			$cover.hide();
			$content.hide();
		}		
				
		return obj;
	}]);
	
	/*提示弹出层模板*/
	function _getTemplate() {
		return [
			'<div>',
				'<div name="cover" class="pop-bg" style="display:none;"></div>',
				'<div name="content" class="pop-bd" style="display:none;">',
					'<h2 name="title" class="tit-hd"></h2>',
					'<div name="confirm" class="form-pop" style="display:none;">',
						'<div name="pwd_div" class="inputBox" style="display:none;">',
							'<p name="tips" style="display:none;" class="tc fs-14 mb-5 mt-5">您的投标金额为<span class="fc-orange" name="tips_inner"></span>元</p>',
							'<input name="password" type="password" class="controll-input">',
						'</div>',
						'<div name="flow_div" class="inputBox inp_flowcon" style="display:none;">',
							'<input name="flow" type="text" class="controll-input">',
							'<span class="unit">MB</span>',
						'</div>',
						'<div name="href_box" class="hrefBox clearfix" style="display:none;">',
							'<a name="forget_pwd" class="fr fc-blue fs-12">忘记支付密码？</a>',
						'</div>',
					'</div>',
					'<div name="alert" class="form-pop" style="display:none;">',
						'<p name="msg_p" class="fs-12 fc-9 pb-10 line-h20 tc"></p>',//net alert
						'<p name="msg_p" class="fs-12 fc-9 pb-10 line-h20 tc">您确定要提交债权转让吗？</p>',
						'<p name="msg_p" class="fs-12 fc-9 pb-10 line-h20 tc">您的余额不足，请充值后再进行操作</p>',
						'<p name="msg_p" class="fs-12 fc-9 pb-10 line-h20 tc">关闭手势密码后将退出登录，您确定要关闭手势密码吗？</p>',
						
						'<p name="msg_p" class="fs-12 fc-9 pb-10 line-h20">亲，您已连续5次密码输入错误,账号将被锁定2小时后自动解锁，或您也可以联系客服<em class="fc-red">400-602-7318</em>直接解锁喔！</p>',
						'<p name="msg_p" class="fs-12 fc-9 pb-10 line-h20">亲，您已连续10次密码输入错误,账号已锁定请联系客服<em class="fc-red">400-602-7318</em>解锁后才能重新有效喔!</p>',
						'<p name="msg_p" class="fs-12 fc-9 pb-10 line-h20">您已经5次输错手势密码，手势解锁已关闭请重新登录</p>',
						'<p name="msg_p" class="fs-12 fc-9 pb-10 line-h20 tc">您可使用红包<em class="fc-red">50</em>元，需支付<em class="fc-red">9950</em>元</p>',
						'<p name="msg_p" class="fs-12 fc-9 pb-10 line-h20">您已成功提交借款申请，请保持您的手机畅通，生菜金融将尽快和您取得联系，如有疑问请联系客服<em class="fc-red">400-602-7318</em>咨询</p>',
					'</div>',
					'<div class="info-btn border-t clearfix">',
						'<a name="btn_cancel" class="fl w_5"></a>',
						'<a name="btn_sure" class="fr w_5"></a>',
					'</div>',
				'</div>',
			'</div>'].join('');	
	}
	
})(window);