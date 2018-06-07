import * as Types from "./mutations-types.js";

console.log(Types);
console.log(Types.INCREMENT);//INCREMENT
console.log(Types.DECREMENT);//DECREMENT
const mutations={
    [Types.INCREMENT](state){//state是自动放入的，默认指的就是当前的state 
               //用mutations来修改state的值  最后需要提交一下 提交了之后这个count的值就修改了
               //所以我们用点击+按钮来触发提交事件
        state.count+=1;
    },
    [Types.DECREMENT](state){
        state.count-=1;
    }
}

export default mutations;