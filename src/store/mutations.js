import * as Types from './mutations-types.js';
const mutations={
    [Types.ADD_CART](state,book) {
        //book是添加的一本书  如果有这本书 累加的是数量 如果没有那么数量为1 放到cartList中
        //查找cartList里面有没有添加进来的那本书
        let product=state.cartList.find(item=>item.bookId===book.bookId);
        //如果有的话
        if(product) {
            product.bookCount+=1;
            //还要更新掉原数组  否则不会刷新
            state.cartList=[...state.cartList];
        }else {
            book.bookCount=1;
            //用新数组替换到老数组
            state.cartList=[...state.cartList,book]
        }
    },
    [Types.CHANGE_COUNT](state,book) {
        let product=state.cartList.find(item=>item.bookId===book.bookId);
        if(product) {
            product.bookCount-=1;
            //还要更新掉原数组  否则不会刷新
            state.cartList=[...state.cartList];
        }
    },
    [Types.REMOVE_CART](state,book){
        state.cartList.forEach((item,i) => {
            if(item.bookId===book.bookId){
                state.cartList.splice(i,1);
            }
        });
        state.cartList=[...state.cartList];
    },
    [Types.CLEAR_CART](state){
        state.cartList=[];
    }
}

export default mutations;