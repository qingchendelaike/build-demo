import api from '../../index'
let header = {
}

export default {
  //图片上传
  uploadImg (params) {
    // return出去了一个promise
    header={post:{'Content-Type':'multipart/form-data'}}
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
    if(idBox){
      let Dmheight = document.body.clientHeight - 106;
      let dmPersonBox = document.getElementById(idBox).clientHeight;
      if (dmPersonBox > Dmheight) {
        document.body.style.height = dmPersonBox + maxH + "px";
      } else {
        document.body.style.height = "100%";
      }
    }else{
      document.body.style.height = "100%";
    }
  }
}
