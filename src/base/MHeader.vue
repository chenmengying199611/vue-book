<template>
  <div class="header">
    <slot></slot>
    <i class="iconfont icon-ziyuan" v-if="back" @click="goback()"></i>
  </div>
</template>

<script>
export default {
  props:{
      //校验一下传递过来的参数类型
      back:{ //这个back属性会被放到这个模块的实例上
          type:Boolean,
          default:false
      }
  },
  data(){
      return {}
  },
  created(){

  },
  methods:{
      goback(){
          this.$router.go(-1);
      }
  },
  computed:{},
  components:{
  }
}
</script>

<style scoped lang="less">
    .header {
        position:fixed;
        top:0;
        left:0;
        /*注意：如果用了定位要写宽度*/
        width:100%;
        background:#afd9ee;
        height:40px;
        text-align:center;
        line-height:40px;
        font-weight:bold;
        i {
            position:absolute;
            left:10px;
            font-size:20px;
        }
    }
</style>