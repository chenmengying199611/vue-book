import axios from 'axios';
// 请求的地址是localhost:3000/sliders  这里请求的地址要写完整  如果只写了/sliders那么就是发在了localhost:8080/sliders
//所以我们要加上一个请求头

//增加默认的请求路径
axios.defaults.baseURL='http://localhost:3000';

axios.interceptors.response.use((res)=>{
  return res.data;
})

//获取轮播图数据
// 获取轮播图数据 , 返回的是一个promise对象
export let getSliders =()=>{
    return axios.get('/sliders')
  };

  //获取热门图书接口
  export let getHotBook=()=>{
    return axios.get('/hot')
  }

  // 获取全部图书
  export let getBooks=()=>{
    return axios.get('/book') //axios.get('/book')拿到了从服务器端res.end()的数据 并且返回出去
                              //若调用getBooks()函数就可以得到return的数据
  }

// 删除指定图书
//根据传入的id来删除对应的书
  export let removeBook=(id)=>{
      return axios.delete(`/book?id=${id}`);
  }

  // 获取某一本书
  export let findOneBook=(id)=>{
    // 这里的地址对应的后台接口  和前台输入的地址关系不太大
    //前台输入地址 渲染页面靠的是路由
    return axios.get(`/book?id=${id}`) //返回的是promise对象
  }

  //修改图书
  export let updateBook=(id,data)=>{//这里发送请求的时候传了两个参数
    //put中第一个参数是接口   第二个参数是传递的数据
    return axios.put(`/book?id=${id}`,data)
  }

  // 添加图书
  export let addBook=(data)=>{
    return axios.post(`/book`,data)
  }

  //返回所有的图书
  export let getAll=()=>{
    return axios.all([getSliders(),getHotBook()]);
  }

  // 根据偏移量返回分页的数据
  export let pagination=(offset)=>{
    return axios.get(`/page?offset=${offset}`);
  }