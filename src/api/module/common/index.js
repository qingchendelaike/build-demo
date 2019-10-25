import api from '../../index'
let header = {
}

export default {
  //图片上传
  uploadImg(params) {
    // return出去了一个promise
    header = { post: { 'Content-Type': 'multipart/form-data' } }
    return api.post('/base/ossUpload', params, header)
  },
  //获取预览链接
  getPreviewLink(params) {
    // return出去了一个promise
    return api.get('/admin/web/getPreviewUrl', params, header)
  },
  //根据预览链接获取资源详情
  getResourceDetail(params) {
    // return出去了一个promise
    return api.get('/admin/web/preview', params, header)
  },
  /* 判断高度是否超出body */
  maxHeight(idBox, maxH) {
    if (idBox) {
      let Dmheight = document.body.offsetHeight - 86;
      let dmPersonBox = document.getElementById(idBox).offsetHeight;
      if (dmPersonBox > Dmheight) {
        document.body.style.height = dmPersonBox + maxH + "px";
      } else {
        document.body.style.height = "100%";
      }
    } else {
      document.body.style.height = "100%";
    }
  },
  /* 获取session方法 */
  user() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    let userpower_lists = JSON.parse(sessionStorage.getItem('userpower_lists'))
    let is_special = JSON.parse(sessionStorage.getItem('is_special'))
    if(userInfo && userpower_lists){
      return {
        userName: userInfo.user_name,
        userImg: userInfo.user_img,
        type: userInfo.type,
        userPhon: userInfo.user_phon,
        userEmail: userInfo.user_email,
        userpower_lists:userpower_lists,
        is_special :is_special
      }
    }
  },
  webDetail(params){
    return api.get('/item/webDetail', params, header)
  },
  webFeedback(params){
    return api.post('/item/webFeedback', params, header)
  },
  wxLogin(params){
    return api.post('/partyUser/checkAccount', params, header)
  },
  webAuth(params){
    return api.get('/wechat/webAuth', params, header)
  },
  webChangeDetail(params){
    return api.get('/item/changeDetail', params, header)
  },
}
