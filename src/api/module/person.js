import api from '../index'
let header = {
}
export default {
  //用户修改密码
  chagePassWord (params) {
    // return出去了一个promise
    return api.post('/systemUser/changePassword', params,header)
  },
  /* 发送短信验证码 */
  sms(params) {
    // return出去了一个promise
    return api.post('/partyUser/sms', params,header)
  },
  /* 基本资料需要验证 */
  senInfo(params) {
    // return出去了一个promise
    return api.get('/partyUser/getSelfSenInfo', params,header)
  },
  /* 公司资料和党务资料无需验证 */
  selfInfo(params) {
    // return出去了一个promise
    return api.get('/partyUser/getSelfInfo', params,header)
  },
  /* 验证手机身份(有密码) */
  phoneAuth(params) {
    // return出去了一个promise
    return api.post('/partyUser/auth', params,header)
  },

  /* 验证手机身份(无密码) */
  densityFree(params) {
    // return出去了一个promise
    return api.post('/partyUser/phoneAuth', params,header)
  },

  /* 发送邮箱验证码 */
  email(params) {
    // return出去了一个promise
    return api.post('/partyUser/email', params,header)
  },
  /* 邮箱验证身份（有密） */
  emailAuth(params) {
    // return出去了一个promise
    return api.post('/partyUser/emailAuth', params,header)
  },

  /* 修改手机号 */
  changePhone(params) {
    // return出去了一个promise
    return api.post('/partyUser/changePhone', params,header)
  },

  /* 党务修改密码 */
  changeDwPsword(params) {
    // return出去了一个promise
    return api.post('/partyUser/changePassword', params,header)
  },
  /* 修改邮箱 */
  changeEmail(params){
    return api.post('/partyUser/changeEmail', params,header)
  }
 
  
}
