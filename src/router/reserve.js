import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 首页
import ReserveIndex from '@/views/reserve/ReserveIndex';
// 选择门店
var ChioceStore = function(resolve) {
  require(['@/views/reserve/ChioceStore'], resolve);
};
// 文件上传
var UploadFile = function(resolve) {
  require(['@/views/reserve/UploadFile'], resolve);
};
// 打印设置
var SetConfig = function(resolve) {
  require(['@/views/reserve/SetConfig'], resolve);
};
// 支付
var Payment = function(resolve) {
  require(['@/views/reserve/Payment'], resolve);
};
// 路由数据
var routeData = [
  {
    path: '*',
    redirect: '/icondemo'
  },
  {
    path: '/',
    name: 'Home',
    component: ReserveIndex,
    meta: {
      // 路由可以带自定义参数
      active: '/reserveindex'
    }
  },
  {
    path: '/index',
    name: 'ReserveIndex',
    component: ReserveIndex
  },
  {
    path: '/chiocestore',
    name: 'ChioceStore',
    component: ChioceStore
  },
  {
    path: '/uploadfile',
    name: 'UploadFile',
    component: UploadFile
  },
  {
    path: '/setconfig',
    name: 'SetConfig',
    component: SetConfig
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  }
];
// 初始化路由
const routes = new Router({
  routes: routeData
});
routes.beforeEach((to, from, next) => {
  // console.log(store);
  next();
});
export default routes;
