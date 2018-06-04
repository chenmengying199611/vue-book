<template>
  <div>
    <MHeader>添加</MHeader>
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
            <label for="bookCover">书的封面</label>
            <input type="text" v-model="book.bookCover" id="bookCover">
          </li>
          <li>
            <button @click="add">添加</button>
          </li>
        </ul>
    <Tab></Tab>
  </div>
</template>

<script>

import MHeader from '../base/MHeader.vue';
import Tab from '../base/Tab.vue'
import {addBook} from '../api'

export default {
  data(){
      return {
        //因为input框中的v-model是双向绑定的 所以只要input框中有数据  就直接添加
        //到book对象中了
        book:{}
      }
  },
  created(){

  },
  methods:{
    async add(){
      await addBook(this.book);//发送请求的数据 直接就是this.book
      this.$router.push('/list');
    }
  },
  computed:{},
  components:{
    MHeader,Tab
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
  </style>