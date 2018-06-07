import Vue from 'vue';

import App from './App.vue';

import store from './store';

import $ from 'jquery';

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.css'

new Vue({
    el:'#app',
    store,   //store被注册到了实例上  所有的组件都有一个属性  this.$store
    ...App,
})