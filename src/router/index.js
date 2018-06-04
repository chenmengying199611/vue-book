import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../components/Home.vue';
// import Collect from '../components/Collect.vue';
// import Add from '../components/Add.vue';
// import Detail from '../components/Detail.vue';
// import List from '../components/List.vue';

Vue.use(Router)

export default new Router({
  routes: [
    // 前台页面的渲染主要依靠的是路由的变化
    //发送请求获取数据 和后台逻辑的主要是接口
    //即现在前台页面的跳转也依靠前端路由来实现
    //后台只返回接口和数据 
    {path:'/',redirect:'/home'},
    {
      path:'/home',
      component:()=>import('../components/Home.vue'),
      meta:{keepAlive:true}
    },
    {
      path:'/collect',
      component:()=>import('../components/Collect.vue')
    },
    {
      path:'/add',
      component:()=>import('../components/Add.vue')
    },
    {
      path:'/list',
      component:()=>import('../components/List.vue')
    },
    {
      path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:'detail'
    }
  ]
})
