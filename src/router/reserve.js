import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 待签收
import IconDemo from '@/views/reserve/IconDemo';
//在途
var BtnDemo = function(resolve) {
  require(['@/views/reserve/BtnDemo'], resolve);
};

// 菜单数据
var moduledata = {
  modulekey: 'order',
  modulename: '运单',
  moduleaction: '/waitsign'
};

var menudata = [
  {
    name: 'order',
    title: '收单',
    icon: 'icon-orderBlank',
    data: [
      {
        menuname: '待签收',
        menukey: '/waitsign'
      },
      {
        menuname: '在途',
        menukey: '/ontheway'
      },
      {
        menuname: '已签收',
        menukey: '/alreadysign'
      }
    ]
  },
  {
    name: 'order',
    title: '异常单',
    icon: 'icon-qianbao1',
    data: [
      {
        menuname: '异常单',
        menukey: '/abnormalorder'
      }
    ]
  },
  {
    name: 'order',
    title: '统计',
    icon: 'icon-qiye1',
    menukey: '/statistics',
    data: []
  }
];

// 菜单数据存入store
var state = {};
state.moduledata = moduledata;
state.menudata = menudata;

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
      active: '/reserve'
    }
  },
  {
    path: '/reserve',
    name: 'IconDemo',
    component: IconDemo,
    meta: {
      active: '/reserve'
    }
  },
  {
    path: '/btndemo',
    name: 'BtnDemo',
    component: BtnDemo,
    meta: {
      active: '/btndemo'
    }
  }
];
var router = new Router({
  routes: routeData
});

// 导出路由和store的数据
export { router, state };
