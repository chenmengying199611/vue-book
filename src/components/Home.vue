<template>
  <div>
    <MHeader :back="false">首页</MHeader>
    <div class="content">
      <Loading v-if="loading">正在疯狂加载中</Loading>
      <template v-else>
      <Swiper :swiperSlides="sliders"></Swiper>
      <div class="container">
        <h3>热门图书</h3>
        <ul>
          <li v-for="(hot,index) in hotBooks" :key="index">
            <img :src="hot.bookCover">
            <b>{{hot.bookName}}</b>
          </li>
        </ul>
      </div>
      </template>
    </div>
  </div>
</template>

<script>

import MHeader from '../base/MHeader.vue';
import Swiper from '../base/Swiper.vue';
import Loading from '../base/Loading.vue';
//引入getSliders方法
//import {getSliders,getHotBook} from '../api';
import {getAll} from '../api';
//在created()中拿请求

export default {
  data(){
      return {
        sliders:[],
        hotBooks:[],
        loading:true
      }
  },
  created(){
    //this.getSlider();//获取轮播图
    //this.getHot();
    this.getData();
  },
  methods:{
    //async getSlider(){//这里的方法名和接口名不能一致  一致就分不清调用的哪一个了
        //let sliders=await getSliders();
        //console.log(sliders);

        //将sliders的值赋值给data（）中的sliders
        //this.sliders=sliders;
    //},
    //async getHot(){
        //let data=await getHotBook();//返回的是个对象  对象里有data属性
        //this.hotBooks=data;
    //}
    async getData(){
      let [sliders,hotBooks]=await getAll();//调用getAll()函数之后返回的是两个数组
      this.sliders=sliders;
      this.hotBooks=hotBooks;
      //轮播图和热门图书已经获取完成
      this.loading=false;
    }

  },
  computed:{},
  components:{
      MHeader,
      Swiper,
      Loading
  }
}
</script>

<style scoped lang="less">
  h3 {
    color:#999;
    padding:5px 0;
  }
  .container {
    width:90%;
    margin:0 auto;
    ul {
      display:flex;
      flex-wrap:wrap;
      padding-bottom:10px;
      li {
            width:50%;
            text-align:center;
            margin:5px 0;
          img {
            width:100%;
          }
      }
    }
    
  }
</style>