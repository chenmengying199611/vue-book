<template>
    <div>
        <div class="item-wrapper">
            <div class='item'>总数：
                <strong>{{totalNum}}</strong>
            </div>
            <div class='item'>总价：
                <strong>{{totalPrice}}</strong>
            </div>
            <div class="item btn btn-danger" @click="clearAll">清空购物车</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'info',
  data() {
    return {
     
    };
  },
 computed:{
    ...mapGetters(['totalPrice','totalNum'])
 },
 methods:{
   ...mapActions(['clearAll'])
 }
};
</script>

<style scoped>
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

</style>