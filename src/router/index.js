import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../components/Home.vue';
// import Collect from '../components/Collect.vue';
// import Add from '../components/Add.vue';
// import Detail from '../components/Detail.vue';
// import List from '../components/List.vue';

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
   
    // 前台页面的渲染主要依靠的是路由的变化
    //发送请求获取数据 和后台逻辑的主要是接口
    //即现在前台页面的跳转也依靠前端路由来实现
    //后台只返回接口和数据 
    {path:'/',redirect:'/home'},
    {
      path:'/home',
      component:()=>import('../components/Home.vue'),
      meta:{keepAlive:true,title:'首页'}
    },
    {
      path:'/collect',
      component:()=>import('../components/Car.vue'),
      meta:{title:'购物车'}
    },
    {
      path:'/add',
      component:()=>import('../components/Add.vue'),
      meta:{title:'添加'}
    },
    {
      path:'/list',
      component:()=>import('../components/List.vue'),
      meta:{title:'列表'}
    },
    {
      path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:'detail',
      meta:{title:'详情'}
    }
  ]
})
