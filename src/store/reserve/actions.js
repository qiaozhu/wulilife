import Vue from 'vue';
import * as types from './types';

// 这是修改state的入口
// 定义方法  读取type   提交conmit
// conmit操作对象指向mutation  mutation修改state
export default {
  // 同步全局配置
  changeGlobal({ commit }, data) {
    commit(types.CHANGE_GLOBAL, data);
  },
  // 同步打印数据
  changePrintdata({ commit }, data) {
    commit(types.CHANGE_PRINTDATA, data);
  }
};
