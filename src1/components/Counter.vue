<template>
  <div>
    计数器: <button @click="minus">-</button>
    <br>
    当前：{{$store.state.count}} <br>
    计数器: <button @click="add">+</button>

    {{$store.getters.val}}
  </div>
</template>
<script>
  import * as Types from '../store/mutations-types.js'
    export default {
        data(){
            return {}
        },
        created(){
        },
        methods: {
            add(){
                // 提交add的mutation
              // 载荷payload
               this.$store.commit(Types.INCREMENT)
            },
            minus(){
               this.$store.commit(Types.DECREMENT)
            }
        },
        computed: {},
        components: {}
    }
</script>
<style scoped>
</style>

