import * as types from './types'
// 由mutation来修改state
const mutations = {
    [types.CHANGE_GLOBAL]: function (state, data) {
        state.g_config = data;
    },
    [types.CHANGE_MENUACTION]: function (state, data) {
        state.moduledata.moduleaction = data;
    },
    [types.CHANGE_REGION]: function (state, data) {
        state.regionData = data;
    },
}
export default mutations
