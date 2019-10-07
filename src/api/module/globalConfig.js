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

  /* 职务权限管理 */

  //获取职务列表
  dutyLists(params) {
    // return出去了一个promise
    return api.get('/duty/lists', params,header)
  },
  //菜单权限
  powerLists(params) {
    // return出去了一个promise
    return api.get('/duty/powerLists', params,header)
  },
  //新增职务
  dutyAdd(params) {
    // return出去了一个promise
    return api.post('/duty/add', params,header)
  },
  //删除职务
  dutyDelete(params) {
    // return出去了一个promise
    return api.post('/duty/delete', params,header)
  },
  //修改职务
  dutyEdit(params) {
    // return出去了一个promise
    return api.post('/duty/edit', params,header)
  },
  

}
