import Vue from 'vue'
import * as types from './types'
import axios from '@/assets/js/axios'
import api from '@/api/order.api'

// 这是修改state的入口
// 定义方法  读取type   提交conmit
// conmit操作对象指向mutation  mutation修改state
export default {
    // 同步全局配置
    changeGlobal({
        commit
    }, data) {
        commit(types.CHANGE_GLOBAL, data);
    },
    // 同步左侧菜单选中
    changeMenuaction({
        commit
    }, data) {
        commit(types.CHANGE_MENUACTION, data);
    },
    // 同步省市区数据
    changeRegion({
        commit
    }, data) {
        commit(types.CHANGE_REGION, data);
    }
}
