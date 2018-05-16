// 封装一层axios请求  统一做拦截 和 错误处理
import Vue from 'vue';
import axios from 'axios';
// import qs from 'qs';
import envConfig from './config';

import { LoadingPlugin, ToastPlugin } from 'vux';
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求发出拦截器
axios.interceptors.request.use(
  config => {
    if (!config.silent) {
      // 默认参数silent为true 会添加loading
      // 不需要loading 请设置config的silent为false
      Vue.$vux.loading.show({
        text: '加载中'
      });
    }

    //初始化post参数 method不区分大小写
    if (config.method.toLowerCase() === 'post' || config.method.toLowerCase() === 'put') {
      // 配置必要参数
      config.data.appcode = envConfig.appcode;
      config.data.v = envConfig.version;
      config.data.session = localStorage.getItem('certification') || '';
      //如果Content-Type = application/x-www-form-urlencoded  需要序列化form参数
      // config.data = qs.stringify(config.data);
    } else {
      // 配置必要参数 get模式下 入参对象可以是data或者params 但params优先
      if (!config.hasOwnProperty('params')) {
        if (config.hasOwnProperty('data')) {
          config.params = config.data;
        } else {
          config.params = {};
        }
      }
      config.params.appcode = envConfig.appcode;
      config.params.v = envConfig.version;
      config.params.session = localStorage.getItem('certification') || '';
    }
    return config;
  },
  error => {
    Vue.$vux.toast.show({
      text: '请求参数错误',
      type: 'text'
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
      return res.data;
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
    console.log(error.response);
    console.log(error.response.status);
    switch (error.response.status) {
      case 400:
        Vue.$vux.toast.show({
          text: '服务器异常',
          type: 'text'
        });
        break;
      case 401:
        Vue.$vux.toast.show({
          text: '服务器异常',
          type: 'text'
        });
        break;
      case 403:
        Vue.$vux.toast.show({
          text: '请求资源无权访问',
          type: 'text'
        });
        break;
      case 404:
        Vue.$vux.toast.show({
          text: '请求资源不存在',
          type: 'text'
        });
        break;
      case 500:
        Vue.$vux.toast.show({
          text: '服务器异常',
          type: 'text'
        });
        break;
      default:
        Vue.$vux.toast.show({
          text: '服务器异常',
          type: 'text'
        });
        break;
    }
    //这里屏蔽掉promise的错误返回值，否则前端axios不做catch处理时控制台会出错！
    return Promise.reject(error.response.data.msg || '服务器异常');
  }
);

export default axios;
