import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 首页
import LibraryIndex from '@/views/library/LibraryIndex';
// 选择门店
// var ChioceStore = function(resolve) {
//   require(['@/views/reserve/ChioceStore'], resolve);
// };

// 路由数据
var routeData = [
  {
    path: '*',
    redirect: '/index'
  },
  {
    path: '/',
    name: 'Home',
    component: LibraryIndex
  },
  {
    path: '/index',
    name: 'LibraryIndex',
    component: LibraryIndex
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
