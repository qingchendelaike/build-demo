<template>
  <div class="index">
    <el-container>
      <el-header>
        <div class="header-router">
          <a class="header-title">党建工作系统</a>
          <router-link
            v-for="(item,index) in routerMsg"
            :key="index"
            v-show="item.show_menu== true && item.power_name !='额外提醒' "
            :class="{'router-link-exact-active':$route.path.indexOf(item.url)>-1}"
            @click="activeLink(index,item.url)"
            :to="item.url"
            tag="a"
          >{{item.power_name}}</router-link>
        </div>
        <div class="userMsg">

          <router-link
            v-for="(item,index) in routerMsg"
            :key="index"
            v-show="item.show_menu== true && item.power_name =='额外提醒' "
            :class="{'router-link-exact-active':$route.path.indexOf(item.url)>-1}"
            @click="activeLink(index,item.url)"
            :to="item.url"
            tag="a"
          > <span class="user-waring"></span></router-link>
         <div style="display:flex;" v-popover:popoverPse>
          <img :src="defaultImg" class="user-icon" alt />
          <span class="user-name">{{userName}}</span>
          <span class="select-icon"></span>
          </div>
        </div>
      </el-header>
      <router-view />
    </el-container>
    <!-- 用户信息 -->
    <el-popover ref="popoverPse" popper-class="personal" trigger="hover" placement="bottom-start">
      <div class="popoverPse">
        <router-link tag="p" to="/index/person/personMSg" v-if="type == 1">个人信息</router-link>
        <router-link tag="p" to="/index/person/adminPerson">账号密码</router-link>
        <p @click="sigOut">退出登录</p>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      type: 2,
      defaultImg: require("../assets/img/defaultIcon.png"),
      activeIndex: 1,
      routerMsg: {}
    };
  },
  methods: {
    sigOut() {
      this.$store.dispatch("setSingOut").then(result => {
        if (result) {
          this.$router.push("/");
        }
      });
    },
    activeLink(index, path) {
      this.activeIndex = index;
      this.$router.push(path);
    }
  },
  mounted() {
    this.userName = this.$api.common.user().userName;
    this.type = this.$api.common.user().type;
    this.defaultImg = this.$api.common.user().userImg;
    this.routerMsg = this.$api.common.user().userpower_lists;
  }
};
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  min-width: 1200px;
  background: rgba(240, 240, 240, 1);
  /deep/ .el-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  /deep/ .el-header {
    background-color: #ffffff;
    height: 66px !important;
    line-height: 24px;
    padding: 19px 48px;
    display: flex;
    .header-router {
      flex: 1 250px;
      /*
      span {
        display: inline-block;
        margin-right: 53px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 600;
        &.header-title {
          @extend .fontSizeAuxiliary;
        }
        &.router-link-exact-active {
          color: rgba(255, 64, 1, 1);
        }
      }*/
      a {
        display: inline-block;
        margin-right: 53px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 600;
        color: #000;
        text-decoration: none;
        &.header-title {
          @extend .fontSizeAuxiliary;
        }
        &.router-link-exact-active {
          color: rgba(255, 64, 1, 1);
        }
      }
    }
    .userMsg {
      display: flex;
      justify-content: center;
      align-items: center;
      .user-icon {
        width: 26px;
        height: 26px;
        margin-left: 38px;
        border-radius: 50%;
      }
      span {
        width: 26px;
        height: 26px;
        &.user-waring {
          display: inline-block;
          background: url("../assets/img/index_sprites.png") no-repeat;
          background-position: -100px -8px;
        }
        &.user-name {
          width: auto;
          margin: 0 13px 0 8px;
        }
        &.select-icon {
          cursor: pointer;
          width: 18px;
          height: 18px;
          background: url("../assets/img/index_sprites.png") no-repeat;
          background-position: -137px -3px;
        }
      }
    }
  }
}
</style>
