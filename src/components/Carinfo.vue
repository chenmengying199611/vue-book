<template>
    <div class="item-wrapper">
            <div class='item'>总数：
                <strong>{{count}}</strong>
            </div>
            <div class='item'>总价：
                ￥<strong>{{totalPrice|numFilter}}</strong>
            </div>
            <button class="item btn btn-danger" @click="clearAll">清空购物车</button>
    </div>
</template>
<script>

    import * as Types from '../store/mutations-types.js'
    import {mapState,mapGetters} from 'vuex';

    export default {
        data(){
            return {

            }
        },
        filters:{
            numFilter(value) {
                //截取当前数据到小数点后两位
                let realVal=Number(value).toFixed(2);
                return Number(realVal);
            }
        },
        methods:{
            clearAll(){
               this.$store.commit(Types.CLEAR_CART); 
            }
        },
        computed:{
            ...mapGetters(['count']),
            ...mapGetters(['totalPrice'])
        }
    }

</script>
<style scoped>
    .item-wrapper {
        width: 100%;
        position: absolute;
        bottom: 50px;
        display: flex;
        height: 50px;
        border: 1px solid #cccccc;
        border-bottom: 0px; 
        line-height: 50px;
    }
    .item-wrapper .item {
        color: red;
        font-weight: bold;
        margin-right: 15px;
    }
    .item-wrapper .item:last-child {
        color:#fff;
        background-color: orange;
        padding: 1px 10px;
        height: 40px;
        margin-top: 5px;
        position: absolute;
        right: 0;
        border: none;
    }
</style>

