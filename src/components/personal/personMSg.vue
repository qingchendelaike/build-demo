<template>
  <div class="personMsg" id="personMsg">
      <div class="personInfo">
        <h2>
          基本资料
          <span v-if="infoBool == false">请验证身份后查看该模块</span>
        </h2>
        <div v-if="infoBool == false">
          <el-form class="phone" ref="form" :model="form" label-width="71px">
            <el-form-item label="手机号码">
              <el-input v-model.trim="form.phone" :readonly="true" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="登录密码">
              <el-input v-model.trim="form.pwd" placeholder="请输入登录密码"></el-input>
            </el-form-item>

            <el-form-item label="验证码">
              <el-col :span="14">
                <el-input v-model.trim="form.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="9" :offset="1" style="text-align: right;">
                <el-button type="primary" plain @click="sendCode()">发送验证码</el-button>
              </el-col>
            </el-form-item>

            <el-form-item class="sendCode">
              <el-button type="primary" :disabled="disabled" @click="auth">提交</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div v-if="infoBool == true" class="personInfo">
          <p>
            <span>身份证号</span>
            <span>{{this.infoData.id_card}}</span>
          </p>
          <p>
            <span>出身年月</span>
            <span>{{this.infoData.birth}}</span>
          </p>
          <p>
            <span>民族</span>
            <span>{{this.infoData.zh_nation}}</span>
          </p>

          <p>
            <span>籍贯</span>
            <span>{{this.infoData.sources}}</span>
          </p>
          <p>
            <span>毕业院校</span>
            <span>{{this.infoData.graduation}}</span>
          </p>
          <p>
            <span>学历</span>
            <span>{{this.infoData.zh_education}}</span>
          </p>
          <p>
            <span>参加工作时间</span>
            <span>{{this.infoData.work_time}}</span>
          </p>
        </div>
      </div>
      <div class="personInfo">
        <h2>公司资料</h2>
        <p>
          <span>所属公司</span>
          <span>{{this.company[0]}}</span>
        </p>
        <p>
          <span>所属部门</span>
          <span>{{this.company[1]}}</span>
        </p>
        <p>
          <span>员工职级</span>
          <span>{{this.company[2]}}</span>
        </p>
      </div>
      <div class="personInfo party">
        <h2>党务资料</h2>
        <p>
          <span>人员身份</span>
          <span>{{selfInfo.zh_identify}}</span>
        </p>
        <p>
          <span>入党申请书提交时间</span>
          <span>{{selfInfo.apply_time}}</span>
        </p>
        <p>
          <span>入党积极分子时间</span>
          <span>{{selfInfo.active_time}}</span>
        </p>
        <p>
          <span>参与培训时间</span>
          <span>{{selfInfo.train_time}}</span>
        </p>
        <p>
          <span>发展对象时间</span>
          <span>{{selfInfo.develop_time}}</span>
        </p>
        <p>
          <span>入党时间</span>
          <span>{{selfInfo.party_time}}</span>
        </p>
        <p>
          <span>转正时间</span>
          <span>{{selfInfo.formal_time}}</span>
        </p>
      </div>
    </div>
</template>

<script>
const md5 = require("md5");
export default {
  data() {
    return {
      disabled: true,
      form: {
        phone: "",
        pwd: "",
        code: ""
      },
      selfInfo: "",
      userPhon: "",
      company: [],
      infoData: [],
      infoBool: false
    };
  },
  watch: {
    form: {
      handler(newObj, oldObj) {
        if (
          newObj.phone.length > 0 &&
          newObj.pwd.length > 0 &&
          newObj.code.length > 0
        ) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /* 验证身份 */
    async auth() {
      let req = {
        phone: this.form.phone,
        password: md5(this.form.pwd),
        code: this.form.code
      };
      const res = await this.$api.person.phoneAuth(req);
      if ((res.status = "success")) {
        /* 基本资料需要验证 */
        const resInfo = await this.$api.person.senInfo();
        if (resInfo.status == "success") {
          this.infoData = resInfo.data;
          this.infoBool = true;
        }
      }
    },
    /* 发送短信验证码 */
    async sendCode() {
      const res = await this.$api.person.sms({
        phone: this.form.phone
      });
      if (res.status == "success") {
        this.$message("发送成功");
      }
    },

    /* 公司资料和党务资料 */
    async comprehensiveBasic() {
      const res = await this.$api.person.selfInfo();
      if (res.status == "success") {
        this.selfInfo = res.data;
        if (res.data.company_rank.length > 0) {
          this.company = res.data.company_rank[0].split("-");
        } else {
          this.company = ["", ""];
        }
      }
    }
  },
  mounted() {
    this.form.phone = this.$api.common.user().userPhon;
    this.comprehensiveBasic();

    let ch = document.body.clientHeight;
    let per = document.getElementById("personMsg").clientHeight;
  }
};
</script>


<style lang="scss" scoped>
.personMsg {
  h2 {
    height: 30px;
    font-size: 22px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-bottom: 32px;
    span {
      padding-left: 18px;
      height: 20px;
      font-weight: 400;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
  .personInfo {
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
    height: auto;
    background: #fff;
    border-radius: 3px;
    padding: 23px 30px;
    .phone {
      width: 388px;
      margin: 0 auto;
      /deep/ .el-form-item__label {
        padding-right: 15px;
      }
      .sendCode {
        text-align: center;
        /deep/ .el-form-item__content {
          margin-left: 0px !important;
        }
      }
    }
    p {
      display: flex;
      margin-bottom: 20px;
      height: 20px;
      line-height: 20px;
      span {
        display: inline-block;
        &:first-child {
          width: 160px;
        }
      }
    }
  }
}
</style>