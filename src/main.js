// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
// 使用轮播图插件
Vue.use(VueAwesomeSwiper);
import 'swiper/dist/css/swiper.css';

// 导入懒加载插件
import VueLazyLoad from 'vue-lazyload';
//使用懒加载插件
// or with options
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: 'http://imgsrc.baidu.com/imgad/pic/item/5882b2b7d0a20cf4f7b86afa7c094b36acaf99ef.jpg',
  loading: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
  attempt: 1
})

Vue.config.productionTip = false

//在进入路由之前  每一次都会执行此方法
//路径地址为localhost:8080/list时   默认是从/到list中去  所以to指的就是list
router.beforeEach(function(to,from,next){
  //console.log(to);
  document.title=to.meta.title;
  next();
})

//购物车
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
