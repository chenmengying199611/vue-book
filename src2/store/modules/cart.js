//初始化数据
const state = {
    shop_list:[{
        id: 11,
        name: '鱼香肉丝',
        price: 12,
      },
      {
        id: 22,
        name: '宫保鸡丁',
        price: 14,
      },
      {
        id: 34,
        name: '土豆丝',
        price: 10,
      },
      {
        id: 47,
        name: '米饭',
        price: 2,
      }],

      //添加到购物车中的商品
      added:[]
};

//getter 抛出去的数据
const getters = {
    // 箭头函数写法
    //这里表示一个函数
    shoplist:state=>state.shop_list,

    // 现在增加商品的click事件解决，但是我们要把added给抛出，
    // 但是前提要对added这个数组进行数据转化

    cartProducts:state=>{
        return state.added.map(({id,num})=>{//在actions只有的id和num的字段
            //在原始数据上进行刷选，这里通过id来匹配
            let product=state.shop_list.find(n=>n.id==id)
            console.log('...product',{...product});

            //到底{...product}和{product}有啥区别？？

            console.log('{product,num}',{product,num})
            //因为added数组里面只有id和num属性 而我们的购物车需要的其他信息还是
            //的从shop_list中拿取 所以返回的是原始数组的数据和num一起返回
            return {
                ...product,
                num
            }

        })
    },

    //计算总价  getters中可以调用getters
    totalPrice:(state,getters)=>{
        var total=0;
        getters.cartProducts.forEach(n => {
            total+=n.price*n.num;
        });
        return total;
    },

    //计算总数量
    totalNum:(state,getters)=>{
        var total=0;
        getters.cartProducts.forEach(n=>{
            total+=n.num;
        })
        return total;
    }


};

//action 异步的操作
const actions = {
    addToCart({commit},product){
        commit('add',{//传递一个add的方法携带参数id
            id:product.id
        })
    },

    //清空购物车

    clearAll({commit}){
        commit('clear')
    },

    //删除购物车中指定的商品
    delProduct({commit},product){
        commit('delete',{
            id:product.id
        })
    }

};

// 既然我们分发出来了一个add的方法，我们在mutations中接受
// ,mutation中可以直接拿到state里面所有的数据，
// 因为这里的added是自己定一个已选商品的数组，
// 我组件中点击时传递一个对象过来的，find这个对象，
// 但是这里有2种情况，一个added为空或者有数据，
// 但是不是当前点击的对象的数据，当为空时，我们人为个这个对象push一个id和num为1的值，
// 有点击就是当前这个对象的时候，我们执行++的操作，这里打印一下的值，或者从vue-tool的种查看的，vuex的一个浏览器的查看，自己百度去安装，查看数据比较方便

//mutation

//先写的mutations中的方法  然后在actions里面发布出去 发布后再product.vue中
//用辅助函数接受  
const mutations = {
    add(state,{id}){//解构id  测试id和{id}的区别
        let record=state.added.find(n=>n.id==id);
        if(!record){
            state.added.push({
                id,
                num:1
            })
        }else {
            record.num++;
        }
        //console.info(record,state.added)
    },

    //清空购物车
    clear(state){
        state.added=[];
    },

    //删除购物车中的指定商品
    delete(state,{id}){//解构id
        state.added.forEach((n,i)=>{
            if(n.id==id){
                state.added.splice(i,1);
            }
        })
    }

};

export default {
  state,
  mutations,
  actions,
  getters,
};