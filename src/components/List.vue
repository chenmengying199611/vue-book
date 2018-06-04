<template>
  <div>
    <MHeader>列表页</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <router-link v-for="(book,index) in books" :key="index" :to="{name:'detail',params:{bid:book.bookId}}" tag="li">
          <img v-lazy="book.bookCover">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <button @click.stop="remove(book.bookId)">删除</button>
          </div>
        </router-link>
      </ul>
      <div @click="More" class="More">加载更多</div>
    </div>
  </div>
</template>

<script>

import MHeader from '../base/MHeader.vue';
import Tab from '../base/Tab.vue';

//导入的是getBooks接口
import  {pagination,removeBook}   from '../api';

export default {
  data(){
      return {
        books:[],
        offset:0,
        hasMore:true,
        //控制多次点击的状态变量
        //默认没有正在加载
        isLoading:false
      }
  },
  created(){
    this.getData();//这里表示页面加载的时候就触发getData()函数
  },
  methods:{
    //滑动的时候触发这个函数
    loadMore(){
      //解构赋值
      //卷去的高度   总高  当前可见区域
      
      //进来时触发scroll事件  可能触发n次  先进来开一个定时器  下次触发的时候
      //将上一次触发的定时器清掉  最后只剩一个

      clearTimeout(this.timer);
      this.timer=setTimeout(()=>{
        let {scrollTop,scrollHeight,clientHeight}=this.$refs.scroll;
        if(scrollTop+clientHeight+20>scrollHeight){
          this.getData();//无限加载
        }
      },13)

    },
    More(){
      this.getData();
    },
    async getData(){
      //这时pagination发送请求从后台得到的数据是一个对象  里面有hasMore
      //和books的值
      //所以{hasMore,books}分别对应的是服务端返回的值
      //这里还要维护一下hasMore  如果hasMore为false了 就不发送请求了

      //当服务端还有数据返回   而且此时没有这在加载的时候  才能够发送请求  
      if(this.hasMore&&!this.isLoading) {

        //当满足条件能进来的时候说明正在加载了  此时的isLoading为true
        this.isLoading=true;
        let {hasMore,books}=await pagination(this.offset);

        this.hasMore=hasMore;
        //this.books=books;//这里的books永远返回5条数据  所以this.books里面只有5条数据
        //那么我们的offset的值怎么拿到呢？？可以从一共返回多少条数据中拿到
        this.books=[...this.books,...books];//把以前拿到的books的数据  和当前这次拿到的books的数据拼接起来
        this.offset=this.books.length;

        //发送完请求之后  就已经加载完毕了  所以isLoading又变为false
        this.isLoading=false;

      }
      
    },

    //这段代码的意思是 如果axios发送请求成功之后应该怎么办
    //async getData(){
      //this.books=await getBooks();//
    //},
    async remove(id){//这个函数是点击button的时候触发的
      await removeBook(id);//axios.delete请求返回的是空对象 这个方法向后台发送删除请求
      //后台数据删除之后前台数据也要删除 两种方法  1、this.getData()重新发送一次请求 获取目前后台的数据
      //2、直接操作前台数据  从前台数据里面删除  因为前台页面渲染的时候 也是用数据渲染的
      this.books=this.books.filter(item=>item.bookId!==id)
    }
  },
  computed:{},
  components:{
    MHeader
  }
}
</script>

<style scoped>
  .content {
    overflow:auto;
  }
  .content ul {
      padding:10px 0;
  }
  .content ul li {
    display:flex;
    padding:10px 0;
    border-bottom:1px solid #f1f1f1;
  }
  .content ul li img {
    width:130px;
    height:150px;
  }
  .content h4 {
    font-size:20px;
    line-height:35px;
  }
  .content p {
    color:#2a2a2a;
    line-height:25px;
  }
  .content b {
    color:red;
  }
  .content button {
    display:block;
    width:60px;
    height:25px;
    background-color:orange;
    color:#fff;
    border:none;
    border-radius:10px;
    outline:none;
  }
  .More {
    margin:0 auto;
    width:90%;
    height:30px;
    background:greenyellow;
    font-size:20px;
    line-height:30px;
    text-align:center;
    color:#fff;
  }
</style>