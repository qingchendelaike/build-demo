<template>
  <el-container class="container-box">
    <el-aside width="190px">

      <router-link
        v-for="(item,index) in indecChild"
        :to="item.path"
        :key="index"
        tag="div"
      >{{item.name}}</router-link>
    </el-aside>
    <el-main class="main-box">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        indecChild: [
          {
            path: "/index/globalConfig/organManage",
            name: "组织架构管理"
          },
          {
            path: "/index/globalConfig/powerManage",
            name: "职务权限管理"
          },
          {
            path: "/index/globalConfig/userManage",
            name: "党务用户管理"
          },
          {
            path: "/index/globalConfig/userData",
            name: "人员资料库"
          }
        ],
      };
    },
    methods: {

    }
  };
</script>

<style lang="scss" scoped>
  .container-box {
    height: 100%;
    padding: 20px;
    /deep/ .el-aside {
      height: 100%;
      background: rgba(246, 246, 246, 1);
      box-shadow: 6px 0px 5px 0px rgba(236, 236, 236, 1);
      border-radius: 3px;
      div {
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        cursor: pointer;
        margin-bottom: 29px;
        &:first-child {
          margin-top: 26px;
        }
        &.router-link-active {
          color: #000;
        }
      }
    }
    /deep/.el-main {
      height: 100%;
      background: rgba(246, 246, 246, 1);
      border-radius: 3px;
      padding: 23px 38px 23px 30px;
    }
  }
  .main-box {
    position: relative;
    padding: 20px 35px 20px 20px;
  }

  /*css精灵图代码*/
  .bg-data_icon_type {
    width: 13px; height: 13px;
    background: url('../../assets/img/navslide_sprites.png') -146px -45px;
  }
  .bg-item_icon_allitem_off {
    width: 13px; height: 11px;
    background: url('../../assets/img/navslide_sprites.png') -146px -78px;
  }
  .bg-item_icon_allitem_on {
    width: 13px; height: 11px;
    background: url('../../assets/img/navslide_sprites.png') -113px -45px;
  }
  .bg-item_icon_implement_off {
    width: 13px; height: 15px;
    background: url('../../assets/img/navslide_sprites.png') -44px -44px;
  }
  .bg-item_icon_implement_on {
    width: 13px; height: 15px;
    background: url('../../assets/img/navslide_sprites.png') -80px -10px;
  }
  .bg-item_icon_mine_off {
    width: 15px; height: 14px;
    background: url('../../assets/img/navslide_sprites.png') -10px -10px;
  }
  .bg-item_icon_mine_on {
    width: 15px; height: 14px;
    background: url('../../assets/img/navslide_sprites.png') -45px -10px;
  }
  .bg-item_icon_series_off {
    width: 13px; height: 15px;
    background: url('../../assets/img/navslide_sprites.png') -113px -10px;
  }
  .bg-item_icon_series_on {
    width: 13px; height: 15px;
    background: url('../../assets/img/navslide_sprites.png') -10px -79px;
  }
  .bg-set_icon_jurisdiction {
    width: 13px; height: 15px;
    background: url('../../assets/img/navslide_sprites.png') -43px -79px;
  }
  .bg-set_icon_systemroles {
    width: 13px; height: 15px;
    background: url('../../assets/img/navslide_sprites.png') -76px -79px;
  }
  .bg-set_icon_systemuser {
    width: 14px; height: 15px;
    background: url('../../assets/img/navslide_sprites.png') -10px -44px;
  }
  .bg-set_icon_user {
    width: 13px; height: 15px;
    background: url('../../assets/img/navslide_sprites.png') -109px -79px;
  }
  .bg-set_icon_userdata {
    width: 13px; height: 15px;
    background: url('../../assets/img/navslide_sprites.png') -146px -10px;
  }
</style>
