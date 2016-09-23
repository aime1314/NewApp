var moduleName = 'config';
module.exports = moduleName;

(function(win) {

	'use strict';
	
	var config = {
	    interfaceUrl: 'http://api.dev.shengcaijinrong.com:8888/',
	    //interfaceUrl: 'http://api.dev.bidai.cn:8888/',
	    //interfaceUrl: 'http://midway.test.bidai.cn/',
	    hot_line: '400-602-7318',
	    withdraw_fee: 2,
	    load: {
	    	rows: 10,//分页
	    	type: {
	    		start: 0,
	    		processing: 1,
	    		end: 2
	    	}
	    },
		bid: {
			type: {
				ttsc: 1,
				common: 2,
				transfer: 3
			}
		},
		device: {
			androidDownloadUrl: 'http://www.baobidai.com/appdownload/ShengcaiApp.apk',
			iosDownloadUrl: 'https://itunes.apple.com/app/id1021457332'
		},
		cmd: {//原生请求指令
			read: 1,
			write: 2,
			share: 3,
			gesture: 4,
			scan: 5,
			dial: 6,
			empty: 7//app主动发起，客户端不发起，生成一个常驻iframe
		},
		empty: {//app主动发起类型
			type: {
				toast: 1,
				removeGesture: 2			
			},
			alertType: {
				gestureForget: 1
			}
		},
		gesture: {//原生读指令
			status: 'gestureStatus',
			create: 1,
			modify: 2,
			remove: 3
		},
		session: {
			maxRequest: 3,
			status: {
				noRequest: '0',
				processing: '1',
				success: '2',
				timeout: '3'
			}
		},
		localKey: {//localstorage cache key
			sessionId: 'sessionId',
			token: 'token',
			isLogin: 'isLogin',
			isAuth: 'isAuth',
			cardNum: 'cardNum'
		},
		sessionKey: {//sessionstorage cache key
			sessionStatus: 'sessionStatus',
			online: 'online'
		},
		emit: {
			toastShow: 'toastShow',
			sessionLose: 'sessionLose',
			logoffSuccess: 'logoffSuccess'
		},
		code: {
			success: 0,
			verifyCode: 1010,//图片验证码
			forceLogin: 1012,//强制重新登录
			loginPasswordWrong: 3020//登录密码错误
		},
		errMsg: {
			serverErr: '抱歉，服务器繁忙，请稍后重试',
			paramsMissing: '输入信息不完整，请重新输入',
			logoutFailed: '退出失败，请重试'
		},
		systemMsg: {
			'offline': '网络已断开'
		}
	};
	
	var pattern = {
		mobile: /^1[3|4|5|7|8]\d{9}$/,
		idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
		payPassword: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,128})$/,
		loginPassword: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*.,\/<>:;"'|\\\{\[\]\}\(\)?]+)$)^[\w~!@#$%\^&*.,\/<>:;"'|\\\{\[\]\}\(\)?]+$/
		//loginPassword: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&.,;|\{\[\]\}]+)$)^[\w~!@#$%\^&.,\/;|\{\[\]\}]+$/
	};
	
	var mainApp = angular.module('mainApp');
	
	mainApp.constant('$config', config);
	
	mainApp.constant('$pattern', pattern);
	
})(window);