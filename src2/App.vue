<template>
    <div id="app">
        <h3>Vuex购物车demo</h3>
        <!-- 商品的列表 -->
        <product></product>
        <!-- 购物车的列表 -->
        <cart></cart>
        <!-- 总数量价格 -->
        <info></info>
    </div>
</template>

<script>
import product from './components/product.vue'; //商品的列表组件
import cart from './components/cart.vue'; //已选商品的组件
import info from './components/info.vue'; //总数量价格的组件

export default {
  name: 'app',
  components: {
    product,
    cart,
    info,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>