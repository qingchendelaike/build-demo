import api from '../index'
let header = {
}
export default {
  //大事记列表
  getData (params) {
    // return出去了一个promise
    return api.get('/item/itemCollectLists', params,header)
  },
}
