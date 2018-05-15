import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import envConfig from './config';

import { LoadingPlugin, ToastPlugin } from 'vux';
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['session'] = localStorage.getItem('certification') || '';

//请求发出拦截器
var loading;
axios.interceptors.request.use(
  config => {
    //添加loading
    Vue.$vux.loading.show({
      text: 'Loading'
    });
    //初始化post参数
    console.log(config);
    if (config.method === 'post' || config.method.toLowerCase === 'put') {
      // 这里统一配置必要参数
      config.data.appcode = envConfig.appcode;
      config.data.v = envConfig.version;
      config.data.session = localStorage.getItem('certification') || '';
      // 序列化form参数
      config.data = qs.stringify(config.data);
    } else {
      // 这里统一配置必要参数
      config.params.appcode = envConfig.appcode;
      config.data.v = envConfig.version;
      config.data.session = localStorage.getItem('certification') || '';
    }
    return config;
  },
  error => {
    Vue.$vux.toast.show({
      text: '参数错误'
    });
    return Promise.reject(error);
  }
);

//请求响应拦截器
axios.interceptors.response.use(
  res => {
    // 所有捕捉到错误 均返回JSON对象{status:1,msg:'错误信息'})页面自己弹出错误msg
    // 特殊错误 需要强行终止页面代码 返回一个异常 Promise.reject();
    // 正常请求返回{status:0,msg:'成功',data:object}
    Vue.$vux.loading.hide();
    if (res.status == 200) {
      if (!res.data) {
        return {
          status: 1,
          msg: '服务器无数据响应'
        };
      }
      var errorCode = res.data.code || undefined;
      if (!errorCode) {
        return {
          status: 0,
          data: res.data
        };
      }
      var errorObj = {
        status: 1,
        msg: ''
      };
      switch (parseInt(errorCode)) {
        case 1:
          errorObj.msg = '服务不可用';
          return errorObj;
          break;
        case 2:
          errorObj.msg = '开发者权限不足';
          return errorObj;
          break;
        case 3:
          errorObj.msg = '用户权限不足';
          return errorObj;
          break;
        case 4:
          errorObj.msg = '图片上传失败';
          return errorObj;
          break;
        case 5:
          errorObj.msg = 'HTTP方法被禁止';
          return errorObj;
          break;
        case 6:
          errorObj.msg = '编码错误';
          return errorObj;
          break;
        case 7:
          errorObj.msg = '请求被禁止';
          return errorObj;
          break;
        case 8:
          errorObj.msg = '服务已经作废';
          return errorObj;
          break;
        case 38:
          errorObj.msg = '对象不存在';
          return errorObj;
          break;
        case 20:
          //errorObj.msg = "缺少session参数";
          Vue.$vux.toast.show({
            text: '登录信息已失效，即将跳转至登录页面'
          });
          setTimeout(function() {
            // window.location.href = "./passport.html#/login";
          }, 3000);
          return Promise.reject('登录信息已失效,错误代码：20');
          break;
        case 21:
          //errorObj.msg = "无效的session参数";
          Vue.$vux.toast.show({
            text: '登录信息已失效，即将跳转至登录页面'
          });
          setTimeout(function() {
            // window.location.href = "./passport.html#/login";
          }, 3000);
          return Promise.reject('登录信息已失效,错误代码：21');
          break;
        case 22:
          errorObj.msg = '缺少appcode参数';
          return errorObj;
          break;
        case 23:
          errorObj.msg = '无效的appcode参数';
          return errorObj;
          break;
        case 24:
          errorObj.msg = '缺少签名参数';
          return errorObj;
          break;
        case 25:
          errorObj.msg = '无效签名';
          return errorObj;
          break;
        case 26:
          errorObj.msg = '缺少方法名参数';
          return errorObj;
          break;
        case 27:
          errorObj.msg = '不存在的方法名';
          return errorObj;
          break;
        case 28:
          errorObj.msg = '缺少版本参数';
          return errorObj;
          break;
        case 29:
          errorObj.msg = '非法的版本参数';
          return errorObj;
          break;
        case 30:
          errorObj.msg = '不支持的版本号';
          return errorObj;
          break;
        case 31:
          errorObj.msg = '无效报文格式类型';
          return errorObj;
          break;
        case 32:
          errorObj.msg = '缺少必选参数';
          return errorObj;
          break;
        case 33:
          errorObj.msg = '非法的参数';
          return errorObj;
          break;
        case 34:
          errorObj.msg = '用户调用服务的次数超限';
          return errorObj;
          break;
        case 35:
          errorObj.msg = '会话调用服务的次数超限';
          return errorObj;
          break;
        case 36:
          errorObj.msg = '应用调用服务的次数超限';
          return errorObj;
          break;
        case 36:
          errorObj.msg = '应用调用服务的频率超限';
          return errorObj;
          break;
        case 9:
          errorObj.msg = res.data.subErrors[0].msg;
          return errorObj;
          break;
        default:
          errorObj.msg = '服务未知异常';
          return errorObj;
          break;
      }
    } else {
      return {
        status: 1,
        msg: '服务器异常'
      };
    }
  },
  error => {
    // 关闭loaading
    Vue.$vux.loading.hide();
    console.log(error);
    switch (error.response.status) {
      case 400:
        Vue.$vux.toast.show({
          text: '数据请求异常:400'
        });
        break;
      case 401:
        Vue.$vux.toast.show({
          text: '数据请求异常:401'
        });
        break;
      case 403:
        Vue.$vux.toast.show({
          text: '请求资源无权访问:403'
        });
        break;
      case 404:
        Vue.$vux.toast.show({
          text: '请求资源不存在:404'
        });
        break;
      case 500:
        Vue.$vux.toast.show({
          text: '数据请求异常:500'
        });
        break;
      default:
        Vue.$vux.toast.show({
          text: '数据请求异常'
        });
        break;
    }
    //这里屏蔽掉promise的错误返回值，否则前端axios不做catch处理时控制台会出错！
    return Promise.reject(error.response.data.msg || '服务器异常');
  }
);

export default axios;
