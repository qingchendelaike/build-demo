<template>
  <div class="box">
    <div class="code">
      <h2 style="margin:0 0 20px 0;">请验证身份后查看该模块</h2>
      <div class="inputBox">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model.trim="ruleForm.phone" placeholder="请输入当前账号绑定的手机号码"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model.trim="ruleForm.code" placeholder="请输入验证码" style="width:170px;"></el-input>
            <el-button type="primary" @click="sendCode" :disabled="disFalse">{{btnTitle}}</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
const md5 = require("md5");
export default {
  data() {
    return {
      ruleForm: {
        phone: "",
        pwd: "",
        code: ""
      },
      disFalse: false,
      btnTitle: "发送验证码",
      rules: {
        phone: [
          {
            required: true,
            message: "请输入当前账号绑定的手机号码",
            trigger: "blur"
          }
        ],
        pwd: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.changePwd();
        } 
      });
    },

    async changePwd() {
      let req = {
        phone: this.ruleForm.phone,
        password: md5(this.ruleForm.pwd),
        code: this.ruleForm.code
      };
      let res = await this.$api.person.phoneAuth(req);

      if (res.status == "success") {
        this.$router.push("/index/globalConfig/partyWork/userData");
      }
    },
    async sendCode() {
      if (this.ruleForm.phone.length == 11) {
        let i = 60;
        let timer = setInterval(() => {
          i--;
          this.disFalse = true;
          if (i == -1) {
            i = 60;
            clearInterval(timer);
            this.disFalse = false;
            this.btnTitle = "发送验证码";
          } else {
            this.btnTitle = i + "s";
          }
        }, 1000);
        const res = await this.$api.person.sms({
          phone: this.ruleForm.phone
        });
        if (res.status == "success") {
          this.$message("发送成功");
        }
      } else {
        this.$message("请输入手机号码");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background: #f6f6f6;
  margin-left: 5px;
  padding: 20px 30px;
  box-sizing: border-box;
  height: 100%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  .inputBox {
    padding: 30px;
    box-sizing: border-box;
    width: 448px;
    height: 290px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
  }
}
</style>
