import Vue from 'vue';

import App from './App.vue';

import store from './store';

new Vue({
    el:'#app',
    ...App,
    store   //store被注册到了实例上  所有的组件都有一个属性  this.$store
})