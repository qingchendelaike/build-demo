import api from '../index'
let header = {}
export default {
  //组织主体
  organization(params) {
    // return出去了一个promise
    return api.get('/organization/lists', params, header)
  },
  /* 类型标签 */
  labelLists(params) {
    // return出去了一个promise
    return api.get('/label/lists', params, header)
  },


  /*反馈下拉*/
  feedbackMenu(params) {
    // return出去了一个promise
    return api.get('/item/feedbackMenu', params, header)
  },
  /*反馈列表*/
  feedbackLists(params) {
    // return出去了一个promise
    return api.get('/item/feedbackLists', params, header)
  },
  /*修改反馈(发起人)*/
  feedbackEdit(params) {
    // return出去了一个promise
    return api.post('/item/editFeedback', params, header)
  },
/*修改反馈备注(发起人)*/
  feedbackEditRemark(params) {
    // return出去了一个promise
    return api.post('/item/editFeedbackRemark', params, header)
  },
  /* 催办反馈 */
  pushFeedback(params) {
    // return出去了一个promise
    return api.post('/item/pushFeedback', params, header)
  },
  /* 反馈事项(参与人) */
  feedback(params) {
    // return出去了一个promise
    return api.post('/item/feedback', params, header)
  },
}
