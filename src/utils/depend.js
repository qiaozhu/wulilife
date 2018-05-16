// 这里放置全局依赖数据
// entry里 vue实例挂在前执行完成
import Vue from 'vue';
import { ToastPlugin } from 'vux';
Vue.use(ToastPlugin);

import axios from '@/utils/axios';
import api from '@/assets/api/reserve.api';

export default new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: '/WXClass/test',
    data: {
      mobile: '18671451730',
      smsNum: '111111'
    }
  }).then(response => {
    if (response.status == 0) {
      resolve(response);
    } else {
      Vue.$vux.toast.show({
        text: response.msg,
        type: 'text'
      });
      reject(response);
    }
  });
});
