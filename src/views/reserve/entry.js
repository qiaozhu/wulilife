import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import FastClick from 'fastclick';
import store from '@/store/reserve/index';
import router from '@/router/reserve';
import Home from './Home';

//加载vuex和router
Vue.use(VueRouter);
Vue.use(Vuex);

// 处理移动端点击
FastClick.attach(document.body);
Vue.config.productionTip = false;

// 如果有全局依赖数据 在这里做promise
import depend from '@/utils/depend';
depend.then(data => {
  console.log('entry lanjie');
  new Vue({
    router,
    store,
    render: h => h(Home)
  }).$mount('#app-box');
});
