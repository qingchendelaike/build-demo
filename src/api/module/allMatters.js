import api from '../index'
let header = {}
export default {
  //所有事项列表
  mattersLists(params) {
    // return出去了一个promise
    return api.get('/item/lists', params, header)
  },

  /* 导出表格 */
  exportList(params) {
    return api.get('/item/export', params, header)
  },

  /* 获取导出凭证 */
  ticket(params) {
    return api.get('/exportTicket', params, header)
  },

  /* 组织架构(主体) */
  organization(params) {
    return api.get('/organization/lists', params, header)
  },

  /* 我执行的 */
  handleLists(params) {
    return api.get('/item/handleLists', params, header)
  },
  /* 我执行的导出列表 */
  handleExport(params) {
    return api.get('/item/handleExport', params, header)
  },

  /* 我发起的 */
  personalLists(params) {
    return api.get('/item/personalLists', params, header)
  },
  /* 我发起的导出列表 */
  personalExport(params) {
    return api.get('/item/personalExport', params, header)
  },

  /* 系列事项列表 */
  seriesItemLists(params) {
    return api.get('/item/seriesItemLists', params, header)
  },

  /* 系列事项编辑 */
  seriesItemEdit(params) {
    return api.post('/series/edit', params, header)
  },
  /* 系列事项添加 */
  seriesItemAdd(params) {
    return api.post('/series/add', params, header)
  },
  /* 系列事项删除 */
  seriesItemDelete(params) {
    return api.post('/series/delete', params, header)
  },
   /* 事项删除 */
   matterSeriesDelete(params) {
    return api.post('/item/deleteSeriesItem', params, header)
  },
  


}
