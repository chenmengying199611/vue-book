import Vue from 'vue';
import Vuex from 'vuex';

import logger from 'vuex/dist/logger.js';

// 引入mutations文件
import mutations from './mutations.js'

Vue.use(Vuex);

//容器是唯一的

const state={count:0};
const getters={
    //计算属性  计算的是状态  所以我们也要传入state
        val:(state)=>state.count%2?'奇数':'偶数'
    //箭头函数  一行代码  没有{}时默认是有一个return的
}

export default new Vuex.Store({
    state,
    mutations,
    // 插件logger
    //在控制台打印出每次的记录
    plugins:[logger()],
    getters,
    strict:true //只能通过mutation（管理员）来更改状态  mutation不支持异步
})
