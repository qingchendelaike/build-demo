import api from '../index'
let header = {
}
export default {
  //全局设置
  getOrganList (params) {
    // return出去了一个promise
    return api.get('/organization/lists', params,header)
  },
}
