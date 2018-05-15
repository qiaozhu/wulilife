import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import { router, state as _state } from '@/router/reserve';
import g_config from '../global';
Vue.use(Vuex);

// 定义vuex
const state = {
  moduledata: _state.moduledata, //当前模块数据
  menudata: _state.menudata, //左侧菜单数据
  regionData: [], //省市区数据
  g_config: g_config
};

var store = new Vuex.Store({
  state,
  mutations,
  actions
});

export { router, store };
//我们规定每个模块一个文件夹  下面有4个文件 按这个标准写
