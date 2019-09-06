import api from '../../index'
let header = {
}

export default {
  //图片上传
  uploadImg (params) {
    // return出去了一个promise
    header={post:{'Content-Type':'multipart/form-data'}}
    return api.post('/admin/wap/picture/up_ma', params, header)
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
}
