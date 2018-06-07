// 组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';

//购物车
import cart from './modules/cart.js'; 

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {  //和文件名字对应
    cart,
  },
  strict: true // 严格模式
});