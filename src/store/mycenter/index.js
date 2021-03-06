import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
// 导出全局配置
import g_config from '../global';

Vue.use(Vuex);

// 当前模块
const moduledata = {
  modulekey: 'mycenter',
  modulename: '个人中心'
};

// 定义vuex
const state = {
  g_config: g_config, //全局布局配置
  moduledata: moduledata //当前模块数据
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
