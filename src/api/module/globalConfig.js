import api from '../index'
let header = {
}
export default {
  //全局设置
  getOrganList(params) {
    // return出去了一个promise
    return api.get('/organization/lists', params, header)
  },
  addOrgan(params) {
    // return出去了一个promise
    return api.post('/organization/add', params, header)
  },
  editOrgan(params) {
    // return出去了一个promise
    return api.post('/organization/edit', params, header)
  },
  delOrgan(params) {
    // return出去了一个promise
    return api.post('/organization/delete', params, header)
  },
  getOrganizeUserLists(params) {
    // return出去了一个promise
    return api.get('/partyUser/organizeUserLists', params, header)
  },

  /* 职务权限管理 */

  //获取职务列表
  dutyLists(params) {
    // return出去了一个promise
    return api.get('/duty/lists', params, header)
  },
  //菜单权限
  powerLists(params) {
    // return出去了一个promise
    return api.get('/duty/powerLists', params, header)
  },
  //新增职务
  dutyAdd(params) {
    // return出去了一个promise
    return api.post('/duty/add', params, header)
  },
  //删除职务
  dutyDelete(params) {
    // return出去了一个promise
    return api.post('/duty/delete', params, header)
  },
  //修改职务
  dutyEdit(params) {
    // return出去了一个promise
    return api.post('/duty/edit', params, header)
  },

  /* 党务用户 */
  //用户列表
  dutyUserLists(params) {
    // return出去了一个promise
    return api.get('/partyUser/lists', params, header)
  },
  // 职务下拉选项
  dutyUserMenu(params) {
    // return出去了一个promise
    return api.get('/duty/menu', params, header)
  },
  // 组织务下拉选项
  dutyUserOrgan(params) {
    // return出去了一个promise
    return api.get('/organization/menu', params, header)
  },
  //添加用户
  partyUserAdd(params) {
    // return出去了一个promise
    return api.post('/partyUser/add', params, header)
  },
  //删除用户
  partyUserDelete(params) {
    // return出去了一个promise
    return api.post('/partyUser/delete', params, header)
  },
  //用户个人信息
  partyUserInfo(params) {
    // return出去了一个promise
    return api.get('/partyUser/getInfo', params, header)
  },
  //修改用户
  partyUserEdit(params) {
    // return出去了一个promise
    return api.post('/partyUser/edit', params, header)
  },

  /* 系统管理 */
  /* 系统角色 */
  //获取角色列表
  roleLists(params) {
    // return出去了一个promise
    return api.get('/role/lists', params, header)
  },
  //菜单权限
  rolePowerLists(params) {
    // return出去了一个promise
    return api.get('/role/powerLists', params, header)
  },
  //新增角色
  roleAdd(params) {
    // return出去了一个promise
    return api.post('/role/add', params, header)
  },
  //删除角色
  roleDelete(params) {
    // return出去了一个promise
    return api.post('/role/delete', params, header)
  },
  //修改角色
  roleEdit(params) {
    // return出去了一个promise
    return api.post('/role/edit', params, header)
  },
  /* 系统用户 */
  //获取用户列表
  systemUserLists(params) {
    // return出去了一个promise
    return api.get('/systemUser/lists', params, header)
  },
  //新增用户
  systemUserAdd(params) {
    // return出去了一个promise
    return api.post('/systemUser/add', params, header)
  },
  //删除用户
  systemUserDelete(params) {
    // return出去了一个promise
    return api.post('/systemUser/delete', params, header)
  },
  //修改用户
  systemUserEdit(params) {
    // return出去了一个promise
    return api.post('/systemUser/edit', params, header)
  },
  //角色权限
  roleMenu(params) {
    // return出去了一个promise
    return api.get('/role/menu', params, header)
  },
  /* 人员资料库 */
  //用户列表
  partyUserList(params) {
    // return出去了一个promise
    return api.get('/partyUser/userLists', params, header)
  },
  //获取指定用户信息
  userInfo(params) {
    // return出去了一个promise
    return api.get('/partyUser/userInfo', params, header)
  },
  //民族组织下拉
  nationLists(params) {
    // return出去了一个promise
    return api.get('/base/nationLists', params, header)
  },
  //公司下拉
  companyLists(params) {
    // return出去了一个promise
    return api.get('/base/companyLists', params, header)
  },
  //部门下拉
  departmentLists(params) {
    // return出去了一个promise
    return api.get('/base/departmentLists', params, header)
  },
  //职级下拉
  rankLists(params) {
    // return出去了一个promise
    return api.get('/base/rankLists', params, header)
  },
  //修改人员资料
  partyEditUserInfo(params) {
    // return出去了一个promise
    return api.post('/partyUser/editUserInfo', params, header)
  },
  /* 获取职务信息 */
  dutyInfoTree(params) {
    // return出去了一个promise
    return api.get('/duty/info', params, header)
  },
}
