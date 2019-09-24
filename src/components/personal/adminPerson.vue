<template>
  <div class="adminPerson">
    <div class="adminMsg" v-show="bool">
      <div class="admiMsg-num">
        <h2>登陆账号</h2>
        <div v-show="type == 2">
          <p>
            <span>用户名称</span>
            <span>{{userName}}</span>
          </p>
        </div>

        <div v-show="type == 1">
          <p>
            <span>手机账号</span>
            <span class="admin-pwd">{{userPhon}}</span>
            <span class="change-pwd" @click="changeDwPhone">更新</span>
          </p>

          <p class="email">
            <span>邮箱账号</span>
            <span class="admin-pwd">{{userEmail}}</span>
            <span class="change-pwd" @click="chageEmail">更新</span>
          </p>
        </div>
      </div>
      <div class="admiMsg-num">
        <h2>登陆密码</h2>
        <p>
          <span>现密码</span>
          <span class="admin-pwd">********</span>
          <span class="change-pwd" v-if="type == 2" @click="updatePwd">修改</span>
          <span class="change-pwd" v-if="type == 1" @click="changeDwPwd">修改</span>
        </p>
      </div>
    </div>

    <change-pwd v-if="hackReset" @changeClose="changeClose" :form="form" :formData="pwdData">
      <!-- bool  是否显示 -->
      <!-- changeClose  取消事件 -->
      <!-- h2title  标题 -->
      <!-- form  传入的数据 -->
      <!-- phoneSub 副标题 -->
    </change-pwd>

    <!-- 党务修改密码 -->
    <change-pwd
      v-if="hackReset"
      @changeClose="changeClose"
      @nextDwPwdBtn="nextDwPwdBtn"
      :form="updataDWPwd"
      :formData="dwPwdData"
    ></change-pwd>
    <!-- 党务修改密码下一步 -->
    <change-pwd
      v-if="hackReset"
      @changeClose="changeClose"
      :form="nextChangeDWPwd"
      :formData="nextChangeDWPwdData"
    ></change-pwd>

    <!-- 党务修改手机号 -->
    <change-pwd
      v-if="hackReset"
      @changeClose="changeClose"
      @disuseClose="disuseClose"
      @newDwPhones="newDwPhones"
      :form="updataDwPhone"
      :formData="dwPhoneData"
    ></change-pwd>
    <!-- 党务用户弃用手机号 -->
    <change-pwd
      v-if="hackReset"
      @changeClose="changeClose"
      @disuseNext="disuseNext"
      :form="disuseUpdataDwPhone"
      :formData="disuseDwPhoneData"
    ></change-pwd>

    <!-- 党务用户绑定新号码 -->
    <change-pwd
      v-if="hackReset"
      @changeClose="changeClose"
      @sendPhone="sendPhone"
      :form="newUpdataDwPhone"
      :formData="newDwPhoneData"
    ></change-pwd>
    <!-- 党务用户修改邮箱 -->
    <change-pwd
      v-if="hackReset"
      @changeClose="changeClose"
      @nextDwEmailBtn="nextDwEmailBtn"
      :form="updataDwEmail"
      :formData="dwEmailData"
    ></change-pwd>
    <!-- 党务用户修改邮箱下一步 -->
    <change-pwd
      v-if="hackReset"
      @changeClose="changeClose"
      :form="nextDwEmail"
      :formData="nextDwEmailData"
    ></change-pwd>
  </div>
</template>


<script>
import { userName, type, userPhon, userEmail } from "@/utils/locaUserInfol";
import changePwd from "../common/changePwd";
export default {
  components: {
    changePwd
  },
  data() {
    return {
      hackReset: true,
      disabled: true,
      userName: "",
      type: "",
      userPhon: "",
      userEmail: "",
      bool: true,
      /* 系统修改密码参数 */
      pwdData: {
        title: "修改密码",
        bool: false,
        sub: false,
        btnTitle: "确定",
        eventBtn: "chagePwd"
      },
      form: {
        oldpwd: {
          label: "旧密码",
          value: "",
          placelabel: "请输入旧密码",
          popover: null,
          btn: null,
          btnIcon: null
        },
        pwd: {
          label: "新密码",
          value: "",
          type: true,
          placelabel: "请输入新密码",
          popover: "popover",
          btn: null,
          btnIcon: null
        },
        pwd2: {
          label: "确认密码",
          value: "",
          placelabel: "请再次输入新密码",
          popover: "popover2",
          btn: null,
          btnIcon: null
        }
      },
      /* 修改党务密码参数 */
      dwPwdData: {
        title: "修改密码",
        bool: false,
        sub: true,
        subColor: "验证手机号码",
        subDefale: "修改密码",
        subTitle: "请先验证手机号码，确保为本人操作",
        color: "#5CA7FF",
        btnTitle: "下一步",
        eventBtn: "nextDwPwdBtn",
        eventCode: "sendCode"
      },
      updataDWPwd: {
        phone: {
          label: "手机号码",
          value: "",
          placelabel: "请输入已绑定的手机号码",
          btn: null,
          btnIcon: null
        },
        code: {
          btn: "获取验证码",
          btnIcon: null,
          label: "验证码",
          value: "",
          placelabel: "请输入验证码"
        }
      },
      /* 修改党务密码下一步 */
      nextChangeDWPwd: {
        oldpwd: {
          label: "旧密码",
          value: "",
          placelabel: "请输入旧密码",
          popover: null,
          btn: null,
          btnIcon: null,
          type: true
        },
        pwd: {
          label: "新密码",
          value: "",
          type: true,
          placelabel: "请输入新密码",
          popover: "popover",
          btn: null,
          btnIcon: null,
          type: true
        },
        pwd2: {
          label: "确认密码",
          value: "",
          placelabel: "请再次输入新密码",
          popover: "popover2",
          btn: null,
          btnIcon: null,
          type: true
        }
      },
      nextChangeDWPwdData: {
        title: "修改绑定手机号",
        bool: false,
        sub: true,
        subBool: true,
        subColor: "验证手机号码",
        subDefale: "修改密码",
        subTitle: "",
        color: "#5CA7FF",
        btnTitle: "确定",
        eventBtn: "changeDWPwd"
      },

      /* 修改党务手机号码参数 */
      dwPhoneData: {
        title: "修改绑定手机号",
        bool: false,
        sub: true,
        subColor: "验证旧号码",
        subDefale: "绑定新号码",
        subTitle: "请先验证手机号码，确保为本人操作",
        color: "#5CA7FF",
        btnTitle: "下一步",
        eventBtn: "nextDwPhoneBtn",
        eventCode: "sendCode",
        eventDisuse: "phoneDisuse"
      },
      updataDwPhone: {
        phone: {
          label: "手机号码",
          value: "",
          placelabel: "请输入已绑定的手机号码",
          btn: null,
          btnIcon: true
        },
        pwd: {
          label: "密码",
          value: "",
          type: true,
          placelabel: "请输入密码",
          btn: null,
          btnIcon: null
        },
        code: {
          btn: "获取验证码",
          label: "验证码",
          value: "",
          placelabel: "请输入验证码",
          btnIcon: null
        }
      },
      /*  修改党务手机号 --手机号弃用 */
      disuseDwPhoneData: {
        title: "修改绑定手机号",
        bool: false,
        sub: true,
        subColor: "验证邮箱",
        subDefale: "绑定新号码",
        subTitle: "请先验证手机号码，确保为本人操作",
        color: "#5CA7FF",
        btnTitle: "下一步",
        eventCode: "sendCodeEmail",
        eventBtn: "disuseNext"
      },
      disuseUpdataDwPhone: {
        mailbox: {
          label: "邮箱",
          value: "",
          placelabel: "请输入已绑定的邮箱",
          btn: null,
          btnIcon: null
        },
        pwd: {
          label: "密码",
          value: "",
          type: true,
          placelabel: "请输入密码",
          btn: null,
          btnIcon: null
        },
        code: {
          btn: "获取验证码",
          label: "验证码",
          value: "",
          placelabel: "请输入验证码",
          btnIcon: null
        }
      },
      /* 党务用户绑定新号码 */
      newDwPhoneData: {
        title: "修改绑定手机号",
        bool: false,
        sub: true,
        subBool: true,
        subColor: "验证旧号码",
        subDefale: "绑定新号码",
        subTitle: "请先验证手机号码，确保为本人操作",
        color: "#5CA7FF",
        btnTitle: "确定",
        eventCode: "sendCode",
        eventBtn: "sendPhone"
      },
      newUpdataDwPhone: {
        phone: {
          label: "新号码",
          phoneCompare: true,
          value: "",
          placelabel: "请输入新的手机号码",
          btn: null,
          btnIcon: null
        },
        code: {
          btn: "获取验证码",
          label: "验证码",
          value: "",
          placelabel: "请输入验证码",
          btnIcon: null
        }
      },
      /* 党务用户修改邮箱 */
      dwEmailData: {
        title: "修改绑定邮箱",
        bool: false,
        sub: true,
        subColor: "验证手机号码",
        subDefale: "验证新邮箱",
        subTitle: "请先验证手机号码，确保为本人操作",
        color: "#5CA7FF",
        btnTitle: "下一步",
        eventBtn: "nextDwEmailBtn",
        eventCode: "sendCode"
      },
      updataDwEmail: {
        phone: {
          label: "手机号码",
          value: "",
          placelabel: "请输入已绑定的手机号码"
        },
        pwd: {
          label: "密码",
          value: "",
          type: true,
          placelabel: "请输入密码"
        },
        code: {
          btn: "获取验证码",
          label: "验证码",
          value: "",
          placelabel: "请输入验证码"
        }
      },
      /* 党务用户修改邮箱下一步 */
      nextDwEmailData: {
        title: "修改绑定邮箱",
        bool: false,
        sub: true,
        subBool: true,
        subColor: "验证手机号码",
        subDefale: "验证新邮箱",
        subTitle: "",
        color: "#5CA7FF",
        btnTitle: "确定",
        eventBtn: "dwChangeEmailBtn",
        eventCode: "sendCodeEmail"
      },
      nextDwEmail: {
        mailbox: {
          label: "新邮箱",
          value: "",
          placelabel: "请输入需要绑定的新邮箱"
        },
        code: {
          btn: "获取验证码",
          label: "验证码",
          value: "",
          placelabel: "请输入验证码"
        }
      }
    };
  },
  methods: {
    /* 取消 */
    changeClose(key) {
      this.bool = key;
      this.nextDwEmailData.bool = this.dwEmailData.bool = this.nextChangeDWPwdData.bool = this.newUpdataDwPhone.bool = this.pwdData.bool = this.dwPwdData.bool = this.dwPhoneData.bool = this.disuseDwPhoneData.bool = this.newDwPhoneData.bool = false;
    },
    /* 修改系统密码跳转 */
    updatePwd() {
      this.bool = false;
      this.pwdData.bool = true;
    },
    /* 修改党务手机号 */
    changeDwPhone() {
      this.bool = false;
      this.dwPhoneData.bool = true;
    },
    /* 党务修改手机号下一步 */
    disuseNext(key) {
      this.rebuileComponents();
      this.disuseDwPhoneData.bool = false;
      this.newDwPhoneData.bool = true;
    },
    /* 党务手机号弃用 */
    disuseClose(key) {
      this.rebuileComponents();
      this.dwPhoneData.bool = false;
      this.disuseDwPhoneData.bool = key;
    },
    /* 党务绑定新手机号 */
    newDwPhones(key) {
      this.rebuileComponents();
      this.dwPhoneData.bool = false;
      this.newDwPhoneData.bool = true;
    },
    /* 党务绑定新手机号成功 */
    sendPhone(key) {
      if (key) {
        this.$store.dispatch("setSingOut").then(result => {
          if (result) {
            this.$router.push("/");
          }
        });
      }
    },

    /* 修改党务密码 */
    changeDwPwd() {
      this.bool = false;
      this.dwPwdData.bool = true;
    },
    /* 党务修改密码下一步 */
    nextDwPwdBtn(key) {
      this.rebuileComponents();
      this.dwPwdData.bool = false;
      this.nextChangeDWPwdData.bool = true;
    },
    /* 党务修改邮箱 */
    chageEmail() {
      this.bool = false;
      this.dwEmailData.bool = true;
    },
    /* 党务修改下一步 */
    nextDwEmailBtn(key) {
      this.rebuileComponents()
      this.dwEmailData.bool = false;
      this.nextDwEmailData.bool = key;
    },
    /* 子标签销毁并重建 */
    rebuileComponents() {
      // 销毁子标签
      this.hackReset = false;
      // 重新创建子标签
      this.$nextTick(() => {
        this.hackReset = true;
      });
    }
  },
  mounted() {
    this.userName = userName;
    this.type = type;
    this.userPhon = userPhon;
    this.userEmail = userEmail;
  }
};
</script>

<style lang="scss" scoped>
.adminPerson {
  h2 {
    height: 30px;
    font-size: 22px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-bottom: 32px;
  }
  .admiMsg-num {
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
    height: auto;
    background: #fff;
    border-radius: 3px;
    padding: 23px 30px;

    p {
      height: 25px;
      font-size: 14px;
      font-weight: 400;
      line-height: 25px;
      display: flex;
      color: #333333;
      &.email {
        margin-top: 20px;
      }
      span {
        &:first-child {
          width: 56px;
          display: inline-block;
          padding-right: 99px;
          color: #555555;
        }
        &.admin-pwd {
          flex: 1;
        }
        &.change-pwd {
          cursor: pointer;
          text-align: center;
          width: 38px;
          height: 25px;
          background: rgba(243, 247, 253, 1);
          border-radius: 3px;
          font-size: 11px;
          color: rgba(92, 167, 255, 1);
          line-height: 25px;
        }
      }
    }
  }
}
</style> 