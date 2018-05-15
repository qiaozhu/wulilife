var Promise = require('es6-promise').Promise;
require('es6-promise').polyfill();
require('es6-promise/auto');
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import FastClick from 'fastclick';
// 兼容promise
import { router, store } from '@/store/reserve/index';
import Home from './Home';

// 加载vuex和router
Vue.use(VueRouter);
Vue.use(Vuex);
// 处理移动端点击
FastClick.attach(document.body);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Home)
}).$mount('#app-box');
