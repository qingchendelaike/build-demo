<template>
  <!-- <div class="person" :style="{'min-height':height}"> -->
  <div class="person">
    <div class="person-box" id="person-box">
      <div class="person-img">
        <img @click="imgVisible = true" :src="defaultIcon" alt />
        <p class="user-text">{{userName}}</p>
        <div class="roter-box">
          <router-link to="/index/person/personMSg" tag="p" v-if="type == 1">个人信息</router-link>
          <router-link to="/index/person/adminPerson" tag="p" v-if="type == 2">账号密码</router-link>
          <router-link to="/index/person/adminPerson" tag="p" v-if="type == 1">账号密码</router-link>
        </div>
      </div>
      <div class="person-updataMsg">
        <router-view></router-view>
      </div>
    </div>

    <!-- 上传图片 -->
    <el-dialog
      title="更换头像"
      :visible.sync="imgVisible"
      width="484px"
      custom-class="chageImg"
      :showClose="false"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
    >
      <div class="previewImg-box">
        <div class="previewImg-img">
          <div
            id="backUrl"
            class="backUrl"
            :style="{backgroundImage:'url(' + userImg + ')',backgroundSize:'100% 100%'}"
          ></div>
          <div class="updata-img">
            <span>
              上传头像
              <updataImg @updateImgBtn="updateImgBtn"></updataImg>
            </span>
            <span class="enlarge" @click="maxImg"></span>
            <span class="narrow" @click="minImg"></span>
          </div>
        </div>
        <div class="previewImg-imgs">
          <p>头像预览</p>
          <div
            class="middle-img"
            id="middle-img"
            :style="{backgroundImage:'url(' + userImg + ')',backgroundSize:'100% 100%'}"
          ></div>
          <div
            class="min-img"
            id="min-img"
            :style="{backgroundImage:'url(' + userImg + ')',backgroundSize:'100% 100%'}"
          ></div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="imgCloseDialog">取 消</el-button>
        <el-button type="primary" @click="imgSum">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userName, userImg, type } from "@/utils/locaUserInfol";
import updataImg from "@/components/common/updataImg";
export default {
  components: {
    updataImg
  },
  data() {
    return {
      updataId: "file",
      height: "",
      defaultIcon: require("../../assets/img/defaultIcon.png"),
      userName: "",
      type: "",
      imgVisible: false,
      userImg: "",
      num: 100,
      files: ""
    };
  },
  methods: {
    /* 接受子组件传会的图片地址 */
    updateImgBtn(imgDataUrl, files) {
      this.userImg = imgDataUrl;
      this.files = files;
    },
    /* 上传图片 */
    async imgSum() {
      let formdata = new FormData();
      formdata.append("file", this.files);
      const res = await this.$api.common.uploadImg(formdata);
      if (res.status == "success") {
        this.userImg = this.defaultIcon = res.data.file_url;
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo.user_img = this.userImg;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.imgVisible = false;
      }
    },
    /* 取消 */
    imgCloseDialog() {
      this.imgVisible = false;
      this.num = 100;
      this.imgsPubilc();
      this.userImg = userImg;
    },
    /* 放大图像 */
    maxImg() {
      if (this.num < 180) {
        this.num += 20;
        this.imgsPubilc();
      }
    },
    minImg() {
      if (this.num > 100) {
        this.num -= 20;
        this.imgsPubilc();
      }
    },
    imgsPubilc() {
      document.getElementById(
        "backUrl"
      ).style.backgroundSize = `${this.num}% ${this.num}%`;
      document.getElementById(
        "middle-img"
      ).style.backgroundSize = `${this.num}% ${this.num}%`;
      document.getElementById(
        "min-img"
      ).style.backgroundSize = `${this.num}% ${this.num}%`;
    }
  },
  mounted() {
    this.userName = userName;
    this.type = type;
    if (userImg) {
      this.userImg = this.defaultIcon = userImg;
    } else {
      this.defaultIcon = this.userImg;
    }
  }
};
</script>

<style lang="scss" scoped>
.person {
  margin: 20px;
  height: 100%;
  background: rgba(246, 246, 246, 1);
  border-radius: 6px;
  .person-box {
    width: 960px;
    margin: 20px auto 0 auto;
    height: auto;
    display: flex;
    justify-content: space-between;
    .person-img {
      width: 199px;
      height: 293px;
      padding: 40px 35px;
      background: rgba(255, 255, 255, 1);
      border-radius: 3px;
      text-align: center;
      img {
        width: 105px;
        height: 114px;
        background: rgba(188, 188, 188, 1);
        border-radius: 22px;
        display: inline-block;
        cursor: pointer;
      }
      p {
        &.user-text {
          font-size: 22px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
          padding: 16px 0 30px 0;
          border-bottom: 1px solid #e5e5e5;
        }
      }
      .roter-box {
        p {
          cursor: pointer;
          font-size: 15px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 21px;
          position: relative;
          &:first-child {
            margin: 30px 0;
            height: 21px;
          }
          &.router-link-exact-active {
            color: #333333;
            &::before {
              content: "";
              width: 0px;
              height: 0px;
              border-top: 5px solid transparent;
              border-bottom: 5px solid transparent;
              border-left: 5px solid #333333;
              position: absolute;
              top: 5px;
              right: 48px;
            }
          }
        }
      }
    }
    .person-updataMsg {
      width: 621px;
      height: auto;
      border-radius: 3px;
    }
  }
}

/deep/ .el-dialog {
  &.chageImg {
    padding: 30px;
    .el-dialog__header {
      padding-top: 0;
      padding-bottom: 30px;
      .el-dialog__title {
        font-size: 15px;
      }
    }
    .el-dialog__body {
      padding: 0;
      .previewImg-box {
        display: flex;
        justify-content: space-between;
        .previewImg-img {
          .backUrl {
            width: 259px;
            height: 281px;
            border-radius: 6px;
            background-position: center center;
          }
          .updata-img {
            margin-top: 20px;
            display: flex;
            span {
              display: inline-block;
              width: 24px;
              height: 24px;
              cursor: pointer;
              &:first-child {
                position: relative;
                flex: 1;
                width: auto;
                line-height: 24px;
                color: #5ca7ff;
              }
              &.enlarge {
                margin-right: 20px;
                background: url("../../assets/img/person_sprites.png") -54px -10px
                  no-repeat;
              }
              &.narrow {
                background: url("../../assets/img/person_sprites.png") -10px -10px
                  no-repeat;
              }
              input {
                cursor: pointer;
                width: 60px;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
              }
            }
          }
        }
        .previewImg-imgs {
          width: 105px;
          text-align: center;
          .middle-img {
            width: 105px;
            height: 114px;
            border-radius: 22px;
            margin: 30px 0 40px 0;
            background-position: center center;
          }
          .min-img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            margin: 0 auto;
            background-position: center center;
          }
        }
      }
    }
  }
}
</style> 