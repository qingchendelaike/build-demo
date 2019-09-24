<template>
  <div class="changeBox">
    <div class="changePwd" v-show="formData.bool">
      <h2>{{formData.title}}</h2>
      <el-form class="ruleForm" ref="formpwd" :model="form" label-width="80px">
        <!-- 副标题 -->
        <div v-show="formData.sub">
          <p class="subMaxTitle">
            <span
              :style="{'color':(formData.subBool != true ? formData.color: '')}"
            >{{formData.subColor}}</span>
            <i class="el-icon-arrow-right"></i>
            <span
              :style="{'color':(formData.subBool == true ? formData.color: '')}"
            >{{formData.subDefale}}</span>
          </p>
          <p class="subMinTitle">
            <span>{{formData.subTitle}}</span>
          </p>
        </div>

        <!-- 循环生产表单 -->
        <el-form-item v-for="(item,index) in form" :key="index" :label="item.label">
          <el-input
            v-if="item.btn == null"
            v-model.trim="item.value"
            :placeholder="item.placelabel"
            :type="item.type == true ? 'password':'text' "
          >
            <i
              slot="suffix"
              v-if="item.btnIcon"
              class="btnIcon"
              @click="eventBtn(formData.eventDisuse)"
            >手机号已弃用？</i>
          </el-input>

          <div v-show="item.btn">
            <el-col :span="15">
              <el-input type="text" v-model.trim="item.value" :placeholder="item.placelabel"></el-input>
            </el-col>
            <el-col :span="8" :offset="1" style="text-align:right;">
              <el-button @click="eventBtn(formData.eventCode)" :disabled="disFalse">{{item.btn}}</el-button>
            </el-col>
          </div>
        </el-form-item>
        <p class="errMsg" v-show="errMsg">{{errMsg}}</p>

        <el-form-item class="btn">
          <el-button @click="changeClose">取消</el-button>
          <el-button
            type="primary"
            :disabled="disabled"
            @click="eventBtn(formData.eventBtn)"
          >{{formData.btnTitle}}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 修改密码提示语 -->
    <!--    <el-popover ref="popover" popper-class="titPop" placement="right" trigger="focus">
      <p :class="{'active':lBool == false}">· 8-16位</p>
      <p :class="{'active':nBool == false}">· 必须包含数字</p>
      <p :class="{'active':zBool == false}">· 必须包含英文字符</p>
    </el-popover>
    <el-popover ref="popover2" popper-class="titPop" placement="right" trigger="focus">
      <p :class="{'active2':lBool == false}">· 8-16位</p>
      <p :class="{'active2':nBool == false}">· 必须包含数字</p>
      <p :class="{'active2':zBool == false}">· 必须包含英文字符</p>
    </el-popover>-->
  </div>
</template>

<script>
import { userName, type, userPhon } from "@/utils/locaUserInfol";
const md5 = require("md5");
export default {
  props: ["form", "formData"],
  data() {
    return {
      disFalse: false,
      errMsg: "",
      disabled: false,
      userName: "",
      userPhon: "",
      zBool: false,
      nBool: false,
      lBool: false,
      pattern: /^(?![0-9]+$)/,
      pattern2: /^(?![a-zA-Z]+$)/,
      pattern3: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
      pattern4: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
    };
  },
  methods: {
    /* 取消 */
    changeClose() {
      this.errMsg = "";
      this.$emit("changeClose", true);
    },
    /* 根据传入的不同，调用不同的事件 */
    eventBtn(val) {
      this[val]();
    },
    /*党务修改密码下一步 */
    async nextDwPwdBtn() {
      const res = await this.$api.person.densityFree({
        phone: this.form.phone.value,
        code: this.form.code.value
      });
      if (res.status == "success") {
        this.$emit("nextDwPwdBtn", true);
      }
    },
    /* 党务修改密码 */
    async changeDWPwd() {
      let req = {
        old_password: md5(this.form.oldpwd.value),
        new_password: md5(this.form.pwd.value)
      };
      const res = await this.$api.person.changeDwPsword(req);
      if (res.status == "success") {
        this.$store.dispatch("setSingOut").then(result => {
          if (result) {
            this.$router.push("/");
          }
        });
      }
    },
    /* 修改邮箱下一步 */
    async nextDwEmailBtn() {
      const res = await this.$api.person.phoneAuth({
        phone: this.form.phone.value,
        code: this.form.code.value,
        password: md5(this.form.pwd.value)
      });
      if (res.status == "success") {
        this.$emit("nextDwEmailBtn", true);
      }
    },
    async dwChangeEmailBtn() {
      const res = await this.$api.person.changeEmail({
        email: this.form.mailbox.value,
        code: this.form.code.value
      });
      if (res.status == "success") {
        this.$store.dispatch("setSingOut").then(result => {
          if (result) {
            this.$router.push("/");
          }
        });
      }
    },

    /* 党务修改手机号--手机号是否弃用 */
    phoneDisuse() {
      this.$emit("disuseClose", true);
    },
    /* 党务修改手机号 下一步*/
    async nextDwPhoneBtn() {
      const res = await this.$api.person.phoneAuth({
        phone: this.form.phone.value,
        code: this.form.code.value,
        password: md5(this.form.pwd.value)
      });
      if (res.status == "success") {
        // 手机号验证成功
        this.$emit("newDwPhones", true);
      }
    },
    /* 提交绑定新手机号 */
    async sendPhone() {
      const res = await this.$api.person.changePhone({
        phone: this.form.phone.value,
        code: this.form.code.value
      });
      if (res.status == "success") {
        // 手机号更换成功
        this.$emit("sendPhone", true);
      }
    },
    /* 发送邮箱验证码 */
    async sendCodeEmail() {
      if (
        this.form.mailbox.value.length > 0 &&
        this.pattern4.test(this.form.mailbox.value)
      ) {
        const res = await this.$api.person.email({
          email: this.form.mailbox.value
        });
        if (res.status == "success") {
          this.errMsg = "";
          this.$message("发送成功");
        }
      } else {
        this.errMsg = "请输入正确的邮箱";
      }
    },
    /* 邮箱验证码提交 */
    async disuseNext() {
      let req = {
        email: this.form.mailbox.value,
        password: md5(this.form.pwd.value),
        code: this.form.code.value
      };
      let res = await this.$api.person.emailAuth(req);
      if (res.status == "success") {
        this.$emit("disuseNext", true);
      }
    },
    /* 发送验证码 */
    async sendCode() {
      if (this.form.phone.value.length == 11) {
        let i = 60;
        let timer = setInterval(() => {
          i--;
          this.disFalse = true;
          if (i == -1) {
            i = 60;
            clearInterval(timer);
            this.disFalse = false;
            this.form.code.btn = "发送验证码";
          } else {
            this.form.code.btn = i + "s";
          }
        }, 1000);
         const res = await this.$api.person.sms({
          phone: this.form.phone.value
        });
        if (res.status == "success") {
          this.errMsg = "";
          this.$message("发送成功");
        }
      } else {
        this.errMsg = "请输入手机号码";
      }
    },

    /* 系统请求提交密码 */
    async chagePwd() {
      let req = {
        old_password: md5(this.form.oldpwd),
        new_password: md5(this.form.pwd)
      };
      const res = await this.$api.person.chagePassWord(req);
      if (res.status == "success") {
        this.disabled = true;
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
          offset: 500,
          duration: 1500
        });
        this.$refs["formpwd"].resetFields();
      }
    },
    /* 修改密码跳转 */
    updatePwd() {
      this.bool = true;
    },
    /* 正则方法 */
    regc(val) {
      this.zBool = this.nBool = this.lBool = false;
      if (val.length == 0) {
        this.zBool = this.nBool = this.lBool = false;
        return;
      }
      this.zBool = this.pattern.test(val) == true ? true : false;
      this.nBool = this.pattern2.test(val) == true ? true : false;
      this.lBool = this.pattern3.test(val) == true ? true : false;
    }
  },
  /*  watch: {
    "form.pwd.value"(val, old) {
      this.regc(val);
    },
    "form.pwd2.value"(val, old) {
      this.regc(val);
      if (
        this.form.pwd.value === this.form.pwd2.value &&
        this.form.pwd.value.length > 0 &&
        this.form.pwd.value.length > 0 &&
        this.form.oldpwd.value.length > 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    "form.code.value"(val, old) {
      if (
        this.form.phone.value.length == 11 &&
        this.form.code.value.length == 4
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }, 
    "form.phone.value"(val, old) {
      if (
        this.form.phone.phoneCompare == true &&
        this.form.phone.value.length == 11 &&
        this.form.phone.value == this.userPhon
      ) {
        this.errMsg = "新旧手机号码不可一致";
      } else {
        this.errMsg = "";
      }
      if (
        this.form.phone.phoneCompare == true &&
        this.form.phone.value.length == 11 &&
        this.form.code.value.length == 4 &&
        this.form.phone.value != this.userPhon
      ) {
        this.disabled = false;
      }
    },
    "form.mailbox.value"(val, old) {
      console.log(this.form.code.value, this.form.pwd.value)
      if (
        this.pattern4.test(this.form.mailbox.value) &&
        this.form.code.value.length == 4 &&
        this.form.pwd.value.length != 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },*/
  mounted() {
    this.userName = userName;
    this.userPhon = userPhon;
  }
};
</script>

<style lang="scss" scoped>
.changeBox {
  h2 {
    height: 30px;
    font-size: 22px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-bottom: 32px;
  }
  .changePwd {
    width: 100%;
    box-sizing: border-box;
    height: auto;
    background: #ffffff;
    border-radius: 3px;
    padding: 23px 30px;
    .btnIcon {
      font-size: 14px;
      font-style: normal;
      color: rgba(92, 167, 255, 1);
      cursor: pointer;
    }
    .ruleForm {
      position: relative;
      width: 400px;
      margin: 0 auto;
      .errMsg {
        box-sizing: border-box;
        padding-left: 82px;
        color: red;
        position: absolute;
        bottom: 76px;
      }
      button {
        width: 100px;
      }
      .subMaxTitle {
        margin: 30px 0 40px 0;
        font-size: 15px;
      }
      .subMinTitle {
        color: rgba(153, 153, 153, 1);
        margin-bottom: 20px;
      }
      .btn {
        margin-top: 60px;
      }
    }
  }
}
.titPop {
  padding: 18px;
  p {
    height: 17px;
    font-size: 12px;
    color: #5ca7ff;
    line-height: 17px;
    &.active {
      color: red;
    }
    &.active2 {
      color: red;
    }
  }
}
</style> 