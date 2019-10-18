import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '../router'
// 创建 axios 实例
let http = axios.create({
  // headers: {'Content-Type': 'application/json'},
  timeout: 60000
})
//设置baseURL
// http.defaults.baseURL = window.location.protocol+'//swift.tfcaijing.com';//正式库
 http.defaults.baseURL = 'http://newtools.free.idcfengye.com';//正式库
// http.defaults.baseURL = window.location.protocol+'//192.168.2.241:8020';//梦霞本地
// http.defaults.baseURL = window.location.protocol+'//192.168.1.114:8083';//测试
//  http.defaults.baseURL = 'http://mytest.tfcaijing.com:8083';//外网
// http.defaults.baseURL = 'http://192.168.1.68:8890';//霖霖服务器
// http.defaults.baseURL = 'http://192.168.0.23:8890';//振聪服务器
// http.defaults.baseURL = 'http://192.168.1.120:8890';//雪慧服务器x
// 设置 post、put 默认 Content-Type
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// http.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
http.interceptors.request.use(config => {
  /* 添加请求token */
  if (sessionStorage.getItem('Token')) {
    config.headers['Token'] = sessionStorage.getItem('Token');
  }
  if (config.method === 'post' || config.method === 'put') {
    // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
    // config.data = JSON.stringify(config.data)  //若是content-type为application/json，则去掉该注释
    //当content-type为application/x-www-form-urlencoded，则去掉该注释,进行序列化
    //当content-type为multipart/form-data，data无需任何处理，已经是formData
    /* if(config.headers.post['Content-Type']=="application/x-www-form-urlencoded"){
      let data=config.data;
      config.data = qs.stringify(data);//对参数进行序列化
    }else  */if(config.headers.post['Content-Type']=="application/json"){
      config.data = JSON.stringify(config.data)
    }
  } else if (config.method === 'get') {
    // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
    let symbol = config.url.indexOf('?') >= 0 ? '&' : '?'
    config.url += symbol + '_=' + Date.now()
  }
  // 请求发送前进行处理
  return config
}, error => {
  Message({
    showClose: true,
    message: "请求失败。",
    type: 'error',
    offset:500,
    duration:1500
  });
  // 请求错误处理
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(response => {
  let {data} = response
  if(data.status=='success'){
    return data;
  }else if(data.retCode==400406||data.retCode==400404) {
    //资源不存在
    return data;//处理预览链接失效或者资源不存在问题
  }else{
    //统一处理错误返回提示
    Message({
      showClose: true,
      message: data.message,
      type: 'error',
      offset:500,
      duration:1500
    });
    if(data.code=='1006'){
      window.sessionStorage.clear()
      router.push("/");
    }
    if(data.retCode==400102){
      //登录超时
      window.sessionStorage.clear()
      router.push('/');
    }
    return data;
  }
}, error => {
  let info = {}
  if (!error.response) {
    info = {
      code: 5000,
      msg: 'Network Error'
    }

  } else {
    // 此处整理错误信息格式
    info = {
     /*  code: status,
      data: data,
      msg: statusText */
      msg:'请求失败。',
      code:'error'
    }
    return info;
  }
  //统一处理错误返回提示
  Message({
    showClose: true,
    message:"请求失败。",
    type: 'error',
    offset:500,
    duration:1500
  });
  return Promise.reject(info)
})

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  return http
}
