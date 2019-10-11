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
  /* 删除标签 */
  labelDelete(params) {
    // return出去了一个promise
    return api.post('/label/delete', params, header)
  },
  /* 修改标签 */
  labelEdit(params) {
    // return出去了一个promise
    return api.post('/label/edit', params, header)
  },
  /* 添加标签 */
  labelAdd(params) {
    // return出去了一个promise
    return api.post('/label/add', params, header)
  },

  /*系列列表*/
  seriesMenu(params) {
    // return出去了一个promise
    return api.get('/series/menu', params, header)
  },
  /*取消事项*/
  cancelItem(params) {
    // return出去了一个promise
    return api.post('/item/cancelItem', params, header)
  },
 /* 事项修改 */
 editItem(params){
  return api.post('/item/edit', params, header)
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

  /*文件列表*/
  fileLists(params) {
    // return出去了一个promise
    return api.get('/item/fileLists', params, header)
  },
  /*删除文件*/
  delFile(params) {
    // return出去了一个promise
    return api.post('/item/delFile', params, header)
  },
  /*替换文件*/
  changeFile(params) {
    // return出去了一个promise
    return api.post('/item/changeFile', params, header)
  },
  /*上传文件*/
  ploadFile(params) {
    // return出去了一个promise
    return api.post('/item/uploadFile', params, header)
  },
  /*选择参与人员*/
  itemUserLists(params) {
    // return出去了一个promise
    return api.get('/partyUser/itemUserLists', params, header)
  },
  /*催办上传*/
  pushUp(params) {
    // return出去了一个promise
    return api.post('/item/pushUploadFile', params, header)
  },
  /*完结事项*/
  finishItem(params) {
    // return出去了一个promise
    return api.post('/item/finishItem', params, header)
  },
  /* 存档类型列表 */
  archiveList(params) {
    // return出去了一个promise
    return api.get('/archive/lists', params, header)
  },
  /* 添加存档类型 */
  archiveAdd(params) {
    // return出去了一个promise
    return api.post('/archive/add', params, header)
  },
  /* 编辑类型列表 */
  archiveEdit(params) {
    // return出去了一个promise
    return api.post('/archive/edit', params, header)
  },
  /* 删除类型列表 */
  archiveDelete(params) {
    // return出去了一个promise
    return api.post('/archive/delete', params, header)
  },
  /* 选择参与人员 */
  organizeUserLists(params) {
    // return出去了一个promise
    return api.get('/partyUser/itemOrganizeUserLists', params, header)
  },
/* 事项添加 */
addItem(params) {
  // return出去了一个promise
  return api.post('/item/add', params, header)
},
}
