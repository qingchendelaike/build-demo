import api from '../index'
let header = {
}
export default {
  //全局设置
  getOrganList (params) {
    // return出去了一个promise
    return api.get('/organization/lists', params,header)
  },
  addOrgan (params) {
    // return出去了一个promise
    return api.post('/organization/add', params,header)
  },
  editOrgan (params) {
    // return出去了一个promise
    return api.post('/organization/edit', params,header)
  },
  delOrgan (params) {
    // return出去了一个promise
    return api.post('/organization/delete', params,header)
  },
  getOrganizeUserLists(params) {
    // return出去了一个promise
    return api.get('/partyUser/organizeUserLists', params,header)
  },
}
