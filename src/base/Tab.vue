<template>
  <div class="footer">
    <router-link to="/home">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
    </router-link>
    <router-link to="/list">
        <i class="iconfont icon-yewubaobiao"></i>
        <span>列表</span>
    </router-link>
    <router-link to="/collect">
        <i class="iconfont icon-shoucang"></i>
        <span>购物车<i>{{count}}</i></span>
    </router-link>
    <router-link to="/add">
        <i class="iconfont icon-tianjia"></i>
        <span>添加</span>
    </router-link>
  </div>
</template>

<script>

import {mapState,mapGetters} from 'vuex';

export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters(['count'])
    }
}
</script>
<!-- 
    display:flex
    flex-direction:row/column
    justify-content:center 垂直居中
    aligin-item:center  横向居中
    flex:1
    router-link-exact-active  路由的每一级都必须精准匹配
    router-link-active  路由匹配可以不需要很严谨
-->
<style scoped lang="less">
    .footer {
        display:flex;
        position:fixed;
        bottom:0;
        left:0;
        height:50px;
        /*因为fixed absolute定位后的元素脱离了文档流 所以宽度变为了0 这里最好给个宽高*/
        width:100%;
        border-top:1px solid #ccc;
        a {
            flex:1;
            /*这里是让a标签里面的i和span纵向布局*/
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            color:#afdeee;
            span {
                position: relative;
                i {
                    position: absolute;
                    top: -25px;
                    left: 35px;
                    font-size: 20px;
                    font-weight: bold;
                    color: red;
                }
            }
        }
        a.router-link-exact-active {
            color:yellowgreen;
        }
    }
</style>
