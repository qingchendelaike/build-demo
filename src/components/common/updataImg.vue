<template>
  <input type="file" :id="updataId" @change="updateImgBtn($event)" accept="image/*" />
</template>


<script>
export default {
  data() {
    return {
      updataId: "files"
    };
  },

  methods: {
    /* 获取上传照片路径 */
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    },
    /* 上传图片预览 */
    updateImgBtn(e) {
      let files = document.getElementById(this.updataId).files[0];
      let imgDataUrl = this.getObjectURL(files);
      this.$emit("updateImgBtn", imgDataUrl,files);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>