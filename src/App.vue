<template>
  <div id="app">
    <!-- 路由切换-->
    <transition name="fadeIn">
    <keep-alive>
      <!-- 需要缓存的内容-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    </transition>
      <!-- 正常的访问  即不需要缓存的页面走这里-->
    <transition name="fadeIn">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>
  </div>
</template>

<script>

import Tab from './base/Tab.vue';

export default {
    name:'app',
    components:{
      Tab
    }
}
</script>

<style>
    * {
      margin:0;
      padding:0;
    }
    ul li {
      list-style:none;
    }
    a {
      text-decoration:none;
    }
    input,button {
       -webkit-appearance:none;
    }
    .content {
      position:fixed;
      width:100%;
      top:40px;
      bottom:50px;
      /*超出页面部分滚动*/
      overflow:auto;
    }
    /*路由动画引入前*/
    .fadeIn-enter {
      opacity:0;
    }
    /*路由动画进入的过程中*/
    .fadeIn-enter-active {
      transition:all 0.3s linear;
    }
    /*路由离开的时候*/
    .fadeIn-leave-active {
      transition:all 0.3s linear;
      opacity:0;
    }
</style>
