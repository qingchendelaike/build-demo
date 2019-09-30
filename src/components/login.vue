<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-left">
        <img src="../assets/img/login_pattern.png" alt />
      </div>
      <div class="login-box-right">
        <p class="box-right-title">党建工作系统</p>
        <div class="box-right-form">
          <div class="input-box" :class=" activeClass == 0 ?'activ-box' :''">
            <p>登录账号</p>
            <input @focus="activeFocus(0)" v-model.trim="from.account" placeholder="请输入登录账号" />
          </div>
          <div class="input-box" :class=" activeClass == 1 ?'activ-box' :''">
            <p>密码</p>
            <input
              @focus="activeFocus(1)"
              type="password"
              v-model="from.password"
              placeholder="请输入密码"
            />
          </div>
          <div class="input-box" :class=" activeClass == 2 ?'activ-box' :''">
            <p>验证码</p>
            <div class="code-box">
              <input
                @focus="activeFocus(2)"
                v-model.trim="codeNum"
                class="code"
                placeholder="请输入验证码"
              />
              <div @click="refreshCode">
                <identify :identifyCode="identifyCode"></identify>
              </div>
            </div>
            <label class="msgError" v-if="errMsg">{{errMsg}}</label>
          </div>
          <button @click="btnLogin">提 交</button>
        </div>
      </div>

      <el-dialog
        title="请选择组织与服务"
        :visible.sync="activeBool"
        width="400px"
        margin-top="0"
        :before-close="handleClose"
        custom-class="dialog-index"
      >
        <el-form>
          <el-select style="width: 100%;" v-model="subject" placeholder="请选择组织与服务">
            <el-option
              v-for="(item,index) in popData"
              :label="item.orange"
              :value="item.orangeID"
              :key="index"
            ></el-option>
          </el-select>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dangerBtn">进入系统</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import identify from "@/components/common/identify";
const md5 = require("md5");
export default {
  name: "login",
  data() {
    return {
      activeClass: 0,
      activeBool: false,
      identifyCodes: "1234567890",
      identifyCode: "",
      select: "",
      errMsg: "",
      codeNum: "",
      is_more_duty: "",
      from: {
        account: "15007221944",
        password: "123456"
      },
      subject: "",
      popData: [],
      dataCookie: ""
    };
  },
  components: {
    identify
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    activeFocus(key) {
      this.activeClass = key;
    },
    async btnLogin() {
/*       let userInfo = {
        user_img: "",
        user_name: "111",
        user_phon: "15007221944",
        user_email: "527809907@qq.com",
        type: 1
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      this.$router.push("/index/eventSummary/allMatters"); */

      if (!this.from.account || !this.from.password) {
        this.errMsg = "账号密码不可为空";
        this.refreshCode();
        return;
      }

      if (this.codeNum != this.identifyCode) {
        this.errMsg = "请输入正确的验证码";
        this.refreshCode();
        return;
      }
      const req = {
        password: md5(this.from.password),
        account: this.from.account
      };
      const res = await this.$api.userLogin.login(req);
      if (res.status == "success") {
          this.$store.dispatch("setMenu", res.data);
        if (res.data.type == 1) {
          if (res.data.is_more_duty == 0) {
             const power = await this.$api.userLogin.loginPower();
            if(power.status == "success"){
              this.$router.push("/index/eventSummary/allMatters");
            }

          } else if (res.data.is_more_duty == 1) {

            this.activeBool = true;
            this.dataCookie = res.data.cookie;
            let data = res.data.organize_duty;
            for (let i = 0; i < data.length; i++) {
              let arr = data[i].split(","),
                arrObj = {};
              arrObj.orange = arr[0];
              arrObj.orangeID = arr[1];
              this.popData.push(arrObj);
            }
          }
        } else if (res.data.type == 2) {
          this.$router.push("/index/eventSummary/allMatters");
        }
      }
    },
    /*进入系统 */
    async dangerBtn() {
      if (!this.subject) {
        this.$message({
          showClose: true,
          message: "请选择职务",
          type: "error",
          offset: 500,
          duration: 1500
        });
      } else {
        let req = {
          cookie: this.dataCookie,
          organize_id: this.subject.split("-")[0],
          duty_id: this.subject.split("-")[0]
        };
        const res = await this.$api.userLogin.chooseLogin(req);
        if (res.status == "success") {
            this.$store.dispatch("setMenu", res.data);
          this.$router.push("/index/eventSummary/allMatters");
        }
      }
    },
    handleClose() {
      this.activeBool = false;
      this.popData = []
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 1200px;
  background: url("../assets/img/login_bg.png") no-repeat;
  background-size: 56% 100%;
  .login-box {
    margin: 0 auto;
    height: 100%;
    display: flex;
    .login-box-left {
      width: 55%;
      height: 100%;
      display: flex;
      text-align: center;
      img {
        margin: auto;
      }
    }
    .login-box-right {
      width: 45%;
      height: 100%;
      position: relative;
      .box-right-title {
        margin-top: 30px;
        padding-right: 30px;
        text-align: right;
        height: 24px;
        font-size: 22px;
        font-weight: normal;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }

      .box-right-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .input-box {
          .code-box {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
          }
          .msgError {
            font-size: 13px;
            font-weight: 400;
            color: rgba(255, 64, 1, 1);
            margin: 0;
            display: inline-block;
          }
          p {
            margin-bottom: 10px;
            width: 300px;
          }
          input {
            width: 258px;
            background: rgba(255, 255, 255, 1);
            padding: 0 20px;
            height: $InputHeight;
            border-radius: $btnRadius3;
            border: 1px solid rgba(224, 224, 224, 1);
            outline: none;
            margin-bottom: 30px;
            &.code {
              margin-bottom: 10px;
              width: 160px;
            }
          }
          &.activ-box {
            input {
              box-shadow: 0px 3px 10px 0px rgba(255, 101, 106, 0.16);
              border: none !important;
            }
            p {
              font-size: 20px;
              font-weight: bold;
              color: rgba(255, 64, 1, 1);
            }
          }
        }

        button {
          width: 150px;
          height: $InputHeight;
          background: rgba(255, 64, 1, 1);
          border-radius: $btnRadius3;
          border: none;
          outline: none;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-top: 30px;
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
  /deep/ .el-dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 200px;
    margin: 0 !important;
    .el-dialog__body {
      padding: 10px 30px;
      .el-select {
        width: 100%;
        .el-input {
          width: 100%;
          input {
            width: 100%;
          }
        }
      }
    }
    .el-dialog__header {
      padding: 20px 30px 10px;
      font-size: 16px;
    }
    .el-dialog__footer {
      padding: 20px 30px;
    }
    .el-button--danger {
      background-color: #ff4001;
      border-color: #ff4001;
    }
    .el-button--danger:hover {
      opacity: 0.7;
    }
    .el-dialog__headerbtn {
      font-size: 22px;
    }
    .el-dialog__headerbtn:hover {
      .el-dialog__close {
        color: #ff4001;
      }
    }
  }
}
</style>

