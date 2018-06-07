<template>
  <div>
    <MHeader>购物车</MHeader>
    <ul class="content">
      <li v-for="(l,index) in cartList" :key="index">
        <img :src="l.bookCover" alt="" style="width:120px;height:140px">
        <div class="right">
          <h3>{{l.bookName}}</h3>
          <button @click="delOneCart(l)">-</button><span>{{l.bookCount}}</span><button @click="addCart(l)">+</button>
          <p>小计 :￥{{l.bookPrice*l.bookCount | numFilter}}</p>
          <button @click="delCart(l)">删除</button>
        </div>
      </li>
    </ul>
    <Carinfo></Carinfo>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import Carinfo from './Carinfo.vue';

  import * as Types from '../store/mutations-types.js'

  // 辅助函数 语法糖
  import {mapState,mapGetters} from 'vuex';
  export default {
        data(){
            return {msg: 'hello'}
        },
        created(){
        },
        filters:{
          numFilter(value) {
                //截取当前数据到小数点后两位
                let realVal=Number(value).toFixed(2);
                return Number(realVal);
            }
        },
        methods: {
          addCart(l){
            this.$store.commit(Types.ADD_CART,l)
          },
          delOneCart(l){
            this.$store.commit(Types.CHANGE_COUNT,l);
          },
          delCart(l){
            this.$store.commit(Types.REMOVE_CART,l);
          }
        },
        computed: {
          ...mapGetters(['count','totolPrice']),
          ...mapState(['cartList'])
          /*cartList(){
              return this.$store.state.cartList
          }*/
        },
        components: {MHeader,Carinfo}
    }
</script>
<style scoped>
  ul {
    padding: 10px;
    padding-top: 0;
  }
  li {
    display: flex;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 15px;
    margin-top: 15px;
  }
  .right {
    margin-left: 40px
  }
  .right h3 {
    margin-bottom: 10px;
  }
  .right button {
    display: inline-block;
    border: none;
    background-color: orange;
    border-radius: 3px;
    padding: 5px 20px;
    text-align: center;
  }
  .right span {
    margin: 0 10px;
  }
  .right p {
    margin: 10px;
    margin-left: 0;
    color: red;
    font-weight: bold;
  }
</style>
