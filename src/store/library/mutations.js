import * as types from './types';
// 由mutation来修改state
const mutations = {
  [types.CHANGE_GLOBAL]: function(state, data) {
    state.g_config = data;
  }
};
export default mutations;
