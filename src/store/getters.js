let getters={
    count:(state)=>state.cartList.reduce((prev,next)=>prev+next.bookCount,0),
    totalPrice:(state)=>state.cartList.reduce((prev,next)=>prev+next.bookCount*next.bookPrice,0)
}

export default getters;