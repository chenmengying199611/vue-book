let http=require('http');
let fs=require('fs');
let url=require('url');

//获取轮播图 /sliders
let sliders=require('./sliders');

function read(cb){
    //fs.readFile()函数是异步的  我们想在调用read函数的时候拿到fs.readFile()异步函数的结果
    //可以用回调函数
    
    fs.readFile('./book.json','utf8',function(err,data){
        if(err || data.length==0) {
            cb([]);//调用cb即 调用了read()里面的回调函数 此时传给books的为空数组
        }else {
            cb(JSON.parse(data));//将读出来的内容转化成对象  传递给books
        }
    })
}

// read(function (books) {//books代表所有图书
//     console.log(books);
// });测试数据

// 写入内容函数  
function write(data,cb){
    // fs.writeFile函数有3个参数 1、写入路径 2、写入的内容 3、写入后的回调函数
    fs.writeFile('./book.json',JSON.stringify(data),cb)
}
//这里调用write()函数的意思是  写入的内容是{}空对象  写入后的回调函数是
// write({},function(){
//     console.log('写入成功')
// })

//每次取出多少个数
let pageSize=5;

http.createServer((req,res)=>{
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/

    // 解构赋值  希望以变量方式  获取obj对象内各值
    //例:var obj={name:'Lin',age:18}
    //var {name,age:test}=obj
    //name
    //"Lin" 新旧变量名一致时 可简写如上
    //test
    //18

    let {pathname,query}=url.parse(req.url,true);//true把query转化成对象
    // console.log('pathname',pathname);
    // console.log('query',query); //这里的query还是空对象 表示是后面的参数
    if(pathname==='/sliders'){
        res.setHeader('Content-Type','application/json;charset=utf8');
        // 这里写完一个if记得return 
        setTimeout(function(){
            return res.end(JSON.stringify(sliders));
        },2000)
        
    }
    if(pathname==='/page'){
        res.setHeader('Content-Type','application/json;charset=utf8');
        let offset=parseInt(query.offset)||0;//拿到当前前端传递的值
        // console.log('offset',offset);
        read(function(books){
            let result=books.reverse().slice(offset,pageSize+offset);//数据倒序传给前端
            // console.log(result);
            //判断是否有更多数据给前端
            //如果要求的路径中的参数+pageSize  要大于所存的数据的数量  就说明没有数据传给前端了
            let hasMore=true;
            if(books.length<=offset+pageSize){
                hasMore=false;
            }
             //对象里面写key和value但是hasMore的key和value一样，所以写一个
            setTimeout(function(){
                res.end(JSON.stringify({hasMore,books:result}))
            },3000)
            
        })

       
        return;
    }
    // 一个路径对应一个接口  路由  在这里我们发现读取数据这个方法会用到很多次 所以我们在外面
    //先封装这个方法
    if(pathname==="/hot") {
        res.setHeader('Content-Type','application/json;charset=utf8');
        read(function (books) {
            // 每页最多放6个  
           let hot=books.reverse().slice(0,6);//包左不包右 取出(0-5)
           res.end(JSON.stringify(hot));//将数组变成字符串
           console.log(typeof hot);//object
        })
        return;
    }

    if(pathname==="/book"){//对书的增删改查

        let id=parseInt(query.id); //取出的是字符串  因为是对象中的id是字符串  为什么query.id可以取到id

        switch (req.method) {//?id=1
            case 'GET'://记住这里的是大写的
                if(!isNaN(id)){//查询一本书  找到那一项  还要把那一项给返回  find方法
                    
                    read(function(books){//books里面是找到的所有书 
                        let book=books.find(item=>item.bookId==id);
                        if(!book) book={}; //如果没找到则是空
                        res.setHeader('Content-Type','application/json;charset=utf8'); 
                        res.end(JSON.stringify(book));
                    })

                }else {//获取所有的书  即调用read()方法
                    
                    read(function (books) {
                        res.setHeader('Content-Type','application/json;charset=utf8');
                        res.end(JSON.stringify(books.reverse()))
                    })

                }
                break;
            case 'POST':
                let str='';
                req.on('data',function(chunk){
                    str+=chunk
                });
                req.on('end',()=>{
                    let book=JSON.parse(str);//转成对象
                    read(function(books){
                        //添加bookId 给book对象一个bookId属性
                        book.bookId=books.length?books[books.length-1].bookId+1:1;
                        books.push(book);//将数据放到books中  books在内存中
                        write(books,function(){
                            res.end(JSON.stringify(books));
                        })
                    })
                })
                break;
            case 'PUT':
                if(id) {//获取当前要修改的id
                    let str='';
                    //接受传递过来的请求体  req是数据流 想读Req里面的数据用on('data')
                    req.on('data',chunk=>{
                        str+=chunk;
                    })
                    req.on('end',()=>{//此时传递过来的req已经被存储成字符串了
                        let book=JSON.parse(str);//将字符串转换为对象 这里已经是修改后的book了
                        read(function(books){
                            books=books.map(item=>{
                                if(item.bookId===id){//找到id相同的那一本书返回
                                    return book;
                                }
                                return item;//其他的数据原封不动返回
                            });
                            write(books,function(){//将数据写回json中
                                res.end(JSON.stringify(book));
                            })
                        })
                    })
                }
                break;
            case 'DELETE':
                read(function(books) {//这个books里面包含所有的书
                    //把item.bookId不等于id的书留下
                    books=books.filter(item=>item.bookId!==id);
                    //删除了数组之后要把之后的数组写到json文件中
                    write(books,function(){
                        res.end(JSON.stringify({}));//删除请求返回空对象
                    })
                })
                break;
        }
        return
    }
}).listen(3000);