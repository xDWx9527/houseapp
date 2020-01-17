import axios from 'axios'
import qs from 'qs'

export const IP =  'http://172.16.14.254:80'   //公司的服务器
// const IP =  'http://172.16.14.253:80'   //李四
// const IP =  'http://172.16.14.254:80'   //公司的服务器
// const IP =  'http://172.16.14.254:80'   //公司的服务器

const req = axios.create({
    baseURL: IP,
    timeout: 10000
})

//export default全局暴露一次，如果出现多行export default，后面暴露的会覆盖前面的
//export 可以暴露多次，同时import时候需要解构{ xx } 才能拿到暴露的数据

//PHP后台必须把post参数使用qs转换一次才可以接收到！！！否则接收不到参数
//登录接口函数： 参数acc：用户名  pwd：密码
export function login(acc, pwd){
    return req.post('/login.php', qs.stringify({acc, pwd}))
}

//获取猜你喜欢列表
export function gethouselist(){
    return req.get('/gethouselist.php')
}
