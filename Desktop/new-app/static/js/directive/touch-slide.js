(function() {

  'use strict';
  
  var mainApp = angular.module('mainApp');

    /*input*/
    mainApp.directive('verAccount',function(){
        return{
            restrict:'AEC',
            scope:{},
            link: function(scope, element, attrs) {
              element.bind('keyup',function(){
                /*金额 */
                  var reg =/[^\d]/g;
                  this.value = this.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                  this.value = this.value.replace(/^\./g,"");  //验证第一个字符是数字而不是.  
                  this.value = this.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
                  this.value = this.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
                  this.value=this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
              })
            }
        }
    }).directive('verCode',function(){
        return{
            restrict:'AEC',
            scope:{},
            link: function(scope, element, attrs) {
              /*验证码 和身份证*/
              element.bind('keyup',function(){
              this.value = this.value.replace(/[^\a-\z\A-\Z0-9]/g,'');
              })
            }
        }
    }).directive('verBank',function(){
        return{
            restrict:'AEC',
            scope:{},
            link: function(scope, element, attrs) {
              element.bind('keyup',function(){
                /*银行卡号 */
                this.value =this.value.replace(/\D/g,'').replace(/....(?!$)/g,'$& ');
                  
              })
            }
        }
    });

    /*流量*/
    mainApp.directive('toggleClass', function(){
      return {
          restrict: 'A',
          scope: {
              toggleClass: '@'
          },
          link: function(scope, element){
            jQuery(document).ready(function($) {
              element.removeClass('on');
              element.on('click', function(){
                 $(this).addClass(scope.toggleClass).siblings().removeClass(scope.toggleClass);
              });
            });
              
          }
      };
  });

})(window);

