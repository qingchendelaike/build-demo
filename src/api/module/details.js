import api from '../index'
let header = {}
export default {
  //组织主体
  organization(params) {
    // return出去了一个promise
    return api.get('/organization/lists', params, header)
  },
  /*反馈列表*/
  feedbackMenu(params) {
    // return出去了一个promise
    return api.get('/item/feedbackMenu', params, header)
  },

}
