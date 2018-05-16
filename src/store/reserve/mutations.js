import * as types from './types';
// 由mutation来修改state
const mutations = {
  [types.CHANGE_GLOBAL]: function(state, data) {
    state.g_config = data;
  },
  [types.CHANGE_PRINTDATA]: function(state, data) {
    state.printData = data;
  }
};
export default mutations;
