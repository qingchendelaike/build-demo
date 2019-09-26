import api from '../index'
let header = {
}
export default {
  //获取模拟json数据
  getData (params) {
    // return出去了一个promise
    return api.post('/login', params,header)
  },
}
