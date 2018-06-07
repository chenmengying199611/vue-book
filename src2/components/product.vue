<template>
  <div class="product">

    <h4>商品信息</h4>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>id</th>
          <th>名称</th>
          <th>价格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(shop,index) in shoplist' :key='index'>
          <td>{{shop.id}}</td>
          <td>{{shop.name}}</td>
          <td>{{shop.price}}</td>
          <td>
            <div class="btn btn-info" @click="addToCart(shop)">购物车</div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

import {mapGetters,mapActions} from 'vuex';

export default {
  name: 'product',
  data() {
    return {
      
    };
  },
  // 这个数据是从product组件剪切走的，现在还回去，是这样秀  在cart.js中换回来的数据
  computed:{
    ...mapGetters(['shoplist'])
  },
  // 这样我们就是action和组件中方法关联起来了,
  methods:{
    ...mapActions(['addToCart'])
  }
};
</script>

<style scoped>
.table-shop > th {
  text-align: center;
}

.item-wrapper {
  display: flex;
  background-color: #dfdfdf;
  align-items: center;
  justify-content: center;
}

.item {
  flex: 1;
}
</style>