<template>
  <el-container class="container-box">
    <el-aside width="190px">
      <ul>
        <li v-for="(navItem,index) in navList" :key="index">
          <div
            class="p-nav"
            :class="{'active':$route.path.indexOf(navItem.url)>-1}"
            v-show="navItem.show_menu == true"
          >{{navItem.power_name}}</div>
          <router-link
            v-for="(item,index) in navItem.sub_power"
            :to="item.url"
            :key="index"
            v-show="item.show_menu == true"
            tag="div"
          >
            <i class="nav-icon" :class="item.icon[0]"></i>
            {{item.power_name}}
          </router-link>
        </li>
      </ul>
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
      navList: []
    };
  },
  mounted() {
    this.navList = this.$api.common.user().userpower_lists[2]["sub_power"];
    let arr = this.navList[0]["sub_power"];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]["show_menu"] == true) {
        this.$router.push(arr[i]["url"]);
        break;
      }
    }
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
    padding: 0 0 0 8px;
    box-sizing: border-box;
    div {
      text-align: left;
      font-size: 15px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 21px;
      cursor: pointer;
      margin-bottom: 29px;
      padding-left: 32px;
      &.p-nav.active {
        color: #333;
        position: relative;
        &:before {
          content: "";
          display: inline-block;
          width: 2px;
          height: 14px;
          background: rgba(221, 45, 30, 1);
          border-radius: 2px;
          position: absolute;
          top: 3px;
          left: 0;
        }
      }
      .nav-icon {
        width: 13px;
        height: 15px;
        display: inline-block;
        margin: 2px 12px 0 0;
        float: left;
        &.bg-item_icon_allitem_on {
          background: url("../../assets/img/navslide_sprites.png") -113px -42px;
        }
        &.bg-set_icon_jurisdiction {
          background: url("../../assets/img/navslide_sprites.png") -43px -79px;
        }
        &.bg-set_icon_user {
          background: url("../../assets/img/navslide_sprites.png") -109px -79px;
        }
        &.bg-set_icon_userdata {
          background: url("../../assets/img/navslide_sprites.png") -146px -10px;
        }
        &.bg-set_icon_systemroles {
          background: url("../../assets/img/navslide_sprites.png") -76px -79px;
        }
        &.bg-set_icon_systemuser {
          background: url("../../assets/img/navslide_sprites.png") -10px -44px;
        }
      }
      &:first-child {
        margin-top: 26px;
      }
      &.router-link-active {
        color: #000;
      }
    }
  }
}
.main-box {
  /*  position: relative;
    padding: 20px 35px 20px 20px; */
  /deep/.el-main {
    padding: 0;
  }
}

/*css精灵图代码*/
.bg-data_icon_type {
  width: 13px;
  height: 13px;
  background: url("../../assets/img/navslide_sprites.png") -146px -45px;
}
.bg-item_icon_allitem_off {
  width: 13px;
  height: 11px;
  background: url("../../assets/img/navslide_sprites.png") -146px -78px;
}

.bg-item_icon_implement_off {
  width: 13px;
  height: 15px;
  background: url("../../assets/img/navslide_sprites.png") -44px -44px;
}
.bg-item_icon_implement_on {
  width: 13px;
  height: 15px;
  background: url("../../assets/img/navslide_sprites.png") -80px -10px;
}
.bg-item_icon_mine_off {
  width: 15px;
  height: 14px;
  background: url("../../assets/img/navslide_sprites.png") -10px -10px;
}
.bg-item_icon_mine_on {
  width: 15px;
  height: 14px;
  background: url("../../assets/img/navslide_sprites.png") -45px -10px;
}
.bg-item_icon_series_off {
  width: 13px;
  height: 15px;
  background: url("../../assets/img/navslide_sprites.png") -113px -10px;
}
.bg-item_icon_series_on {
  width: 13px;
  height: 15px;
  background: url("../../assets/img/navslide_sprites.png") -10px -79px;
}
</style>
