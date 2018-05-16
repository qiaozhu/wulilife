import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 待签收
import IconDemo from '@/views/reserve/IconDemo';
//在途
var BtnDemo = function(resolve) {
  require(['@/views/reserve/BtnDemo'], resolve);
};
//在途
var UploadFile = function(resolve) {
  require(['@/views/reserve/UploadFile'], resolve);
};
//在途
var TableDemo = function(resolve) {
  require(['@/views/reserve/TableDemo'], resolve);
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
    component: IconDemo,
    meta: {
      // 路由可以带自定义参数
      active: '/reserve'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: IconDemo
  },
  {
    path: '/icondemo',
    name: 'IconDemo',
    component: IconDemo
  },
  {
    path: '/btndemo',
    name: 'BtnDemo',
    component: BtnDemo
  },
  {
    path: '/uploadfile',
    name: 'UploadFile',
    component: UploadFile
  },
  {
    path: '/tabledemo',
    name: 'TableDemo',
    component: TableDemo
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
