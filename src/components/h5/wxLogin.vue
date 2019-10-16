<template>
  <div class="boxLogin">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model.trim="form.name" placeholder="请输入登录账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="warning" round @click="onSubmit">认证并绑定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const md5 = require("md5");
export default {
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      let res = this.$api.common.wxLogin({
        account: this.form.name,
        password: md5(this.form.pwd)
      });

      if (res.status == "success") {
        window.location.href = `${window.location.protocol}//192.168.1.114:8083/wechat/webAuth?account=${this.form.name}`
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.boxLogin {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    text-align: center;
    input {
      outline: none;
      cursor: pointer;
    }
  }
}
</style>