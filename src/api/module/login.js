import api from '../index'
let header = {
}
export default {
  //用户登录
  login (params) {
    // return出去了一个promise
    return api.post('/login', params,header)
  },
  /* 单职务 */
  loginPower(params) {
    // return出去了一个promise
    return api.get('/login/getPower', params,header)
  },
  /* 多职务 */
  chooseLogin(params) {
    // return出去了一个promise
    return api.post('/login/chooseLogin', params,header)
  }
}
