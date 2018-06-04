<template>
  <div class="detail">
      <MHeader :back="true">详情</MHeader>
        <ul>
          <li>
            <label for="bookName">书的名称</label>
            <input type="text" v-model="book.bookName" id="bookName">
          </li>
          <li>
            <label for="bookInfo">书的信息</label>
            <input type="text" v-model="book.bookInfo" id="bookInfo">
          </li>
          <li>
            <label for="bookPrice">书的价格</label>
            <input type="text" v-model.number="book.bookPrice" id="bookPrice">
          </li>
          <li>
            <button @click="update">确认修改</button>
          </li>
        </ul>
  </div>
</template>

<script>

import MHeader from '../base/MHeader.vue';
import {findOneBook,updateBook} from '../api';
export default {
  data(){
      return {
        book:{}
      }
  },
  watch:{
    $route(){
      this.getData();
    }
  },
  created(){//页面一加载 需要根据id 发送请求
    this.getData();
  },
  methods:{
    async getData(){//通过id找到某一项后 赋给book  这里写的getData()方法要在created()中调用
      this.book=await findOneBook(this.bid);
      //如果路由参数中的数据找不到，那么强行回到list页面
      //这里涉及到如何判断一个对象为空
      Object.keys(this.book).length>0?void 0:this.$router.push('/list');
    },

    async update(){//发送异步请求  点击修改图书信息
      await updateBook(this.bid,this.book);

      //什么时候会走这个跳转页面的函数？在updateBook()发送完请求之后 要先等着
      //等server.js中的res.end()  下面的push代码才会执行
      //即只有后台响应完之后才会往下面走  所以我们servue.js中必须
      //要写Res.end()不然会一直卡住

      this.$router.push('/list');//修改完成后跳转页面
    }
  },
  computed:{
    //将路径参数的id映射到bid上
    bid(){
      return this.$route.params.bid;
    }
  },
  components:{
    MHeader
  }
}
</script>

<style scoped lang="less">
  ul {
    margin:50px 20px 0 20px;
      li {
        label {
          display:block;
          font-size:25px;
        }
        input {
          margin:10px 0;
          height:25px;
          width:100%;
        }
        button {
          display:block;
          width:80px;
          height:25px;
          background-color:#2aabd2;
          color:#fff;
          border:none;
          border-radius:10px;
          outline:none;
        }
      }
  }
  .detail {
    position:absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    background:#fff;
    z-index:10;
  }
</style>